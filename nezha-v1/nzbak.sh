#!/usr/bin/env bash

#===============================================================
#                   Nezha Dashboard Backup Script
#
# 此备份脚本适用于 nezha v1 官方版，将其存放于vps的 /root 目录
#
# 功能:
#   - 自动检查并安装依赖 (git, sqlite3, tar, curl, wget)。
#   - 备份: 优化并备份 Nezha 面板的数据库和配置文件至私有 GitHub 仓库。
#           同时生成一个 README.md 文件，记录最新的备份文件名。
#   - 还原: 从 GitHub 仓库拉取最新的备份文件并恢复至面板。
#
# 使用方法:
#   - 备份: bash nzbak.sh bak
#   - 还原: bash nzbak.sh res
#
#===============================================================

#---------------------------------------------------------------
# GITHUB 仓库配置 (请务必修改为自己的信息)
#---------------------------------------------------------------
GH_BACKUP_USER="your_github_username"
GH_REPO="your_private_repo_name"
GH_PAT="your_github_personal_access_token"
GH_EMAIL="your_github_email@example.com"

#---------------------------------------------------------------
# 面板工作目录配置 (如果不是默认路径，请修改)
#---------------------------------------------------------------
WORK_DIR="/opt/nezha/dashboard"

#---------------------------------------------------------------
# 脚本核心逻辑 (非专业人士请勿修改以下内容)
#---------------------------------------------------------------

# 颜色定义
info() { echo -e "\033[32m\033[01m$*\033[0m"; }    # 绿色
error() { echo -e "\033[31m\033[01m$*\033[0m" && exit 1; } # 红色
hint() { echo -e "\033[33m\033[01m$*\033[0m"; }    # 黄色

check_and_install_dependencies() {
    info "============== 正在检查脚本依赖 =============="
    # 定义所需命令和对应的包名
    DEPS_COMMAND=("git" "sqlite3" "tar" "curl" "wget")
    
    # 检测包管理器
    if command -v apt-get &>/dev/null; then
        PM="apt"
        DEPS_PACKAGE=("git" "sqlite3" "tar" "curl" "wget")
    elif command -v yum &>/dev/null; then
        PM="yum"
        DEPS_PACKAGE=("git" "sqlite" "tar" "curl" "wget")
    elif command -v dnf &>/dev/null; then
        PM="dnf"
        DEPS_PACKAGE=("git" "sqlite" "tar" "curl" "wget")
    elif command -v apk &>/dev/null; then
        PM="apk"
        DEPS_PACKAGE=("git" "sqlite" "tar" "curl" "wget")
    else
        error "未能识别的包管理器。请手动安装以下依赖: ${DEPS_COMMAND[*]}"
    fi

    # 查找缺失的命令
    MISSING_PKGS=()
    for i in "${!DEPS_COMMAND[@]}"; do
        if ! command -v "${DEPS_COMMAND[i]}" &>/dev/null; then
            MISSING_PKGS+=("${DEPS_PACKAGE[i]}")
        fi
    done

    # 如果有缺失的包，则自动安装
    if [ ${#MISSING_PKGS[@]} -gt 0 ]; then
        info "检测到缺失的依赖: ${MISSING_PKGS[*]}，正在自动安装..."
        case "$PM" in
            apt)
                apt-get update && apt-get install -y "${MISSING_PKGS[@]}"
                ;;
            yum|dnf)
                "$PM" install -y "${MISSING_PKGS[@]}"
                ;;
            apk)
                apk update && apk add --no-cache "${MISSING_PKGS[@]}"
                ;;
        esac
        # 再次检查是否安装成功
        for i in "${!DEPS_COMMAND[@]}"; do
             if ! command -v "${DEPS_COMMAND[i]}" &>/dev/null; then
                error "依赖 ${DEPS_COMMAND[i]} 自动安装失败，请手动安装后重试。"
             fi
        done
        info "所有依赖已成功安装。"
    else
        info "所有依赖均已满足。"
    fi
}

# 检查运行环境 (Docker 或 systemd)
IS_DOCKER=0
# 在 Docker 容器内执行此脚本时，会检测到 Docker 环境
if [ -f "/.dockerenv" ] || grep -q "docker" /proc/1/cgroup; then
    IS_DOCKER=1
fi

# 服务控制函数，优先处理 Docker 容器
control_service() {
    local action="$1" # "stop" 或 "start"
    
    hint "正在 $action Nezha 面板服务..."
    # 脚本在宿主机运行时，通过 WORK_DIR 判断是否为 Docker 部署
    if [ -f "${WORK_DIR}/docker-compose.yaml" ] || docker ps -a --format '{{.Names}}' | grep -q "^nezha-dashboard$"; then
        IS_DOCKER=1
    fi

    if [ "$IS_DOCKER" = 1 ]; then
        # 在 Docker 环境中，直接尝试用 docker 命令操作名为 nezha-dashboard 的容器
        docker "$action" nezha-dashboard >/dev/null 2>&1
        if [ $? -ne 0 ]; then
             hint "无法执行 'docker $action nezha-dashboard' (可能容器已处于目标状态或不存在)。"
        fi
    else
        # 宿主机环境中使用 systemd
        if command -v systemctl &>/dev/null; then
            if systemctl is-active --quiet nezha-dashboard && [ "$action" = "stop" ]; then
                systemctl stop nezha-dashboard
            elif ! systemctl is-active --quiet nezha-dashboard && [ "$action" = "start" ]; then
                systemctl start nezha-dashboard
            fi
        else
            error "未找到 systemctl 命令。请根据您的系统调整服务控制逻辑。"
        fi
    fi
    sleep 3 # 等待服务完全停止或启动
}

# 备份函数
do_backup() {
    info "============== 开始执行备份任务 =============="
    
    # 停止面板服务
    control_service "stop"
    
    cd "$WORK_DIR" || error "无法进入工作目录: $WORK_DIR"

    # 优化数据库
    hint "正在优化数据库..."
    if sqlite3 "data/sqlite.db" ".output /tmp/tmp.sql" ".dump" ".quit" && \
       sqlite3 "/tmp/new.sqlite.db" ".read /tmp/tmp.sql" ".quit"; then
        mv -f "/tmp/new.sqlite.db" "data/sqlite.db"
        sqlite3 "data/sqlite.db" 'VACUUM;'
        info "数据库优化完成。"
    else
        control_service "start" # 如果失败，重启服务
        error "数据库优化失败。"
    fi
    rm -f /tmp/tmp.sql

    # 克隆备份仓库
    hint "正在克隆备份仓库..."
    [ -d /tmp/$GH_REPO ] && rm -rf /tmp/$GH_REPO
    if ! git clone "https://$GH_PAT@github.com/$GH_BACKUP_USER/$GH_REPO.git" --depth 1 /tmp/$GH_REPO; then
        control_service "start"
        error "克隆仓库失败。请检查您的 GitHub 用户名、仓库名和 PAT 是否正确。"
    fi
    
    # 压缩需要备份的文件
    hint "正在压缩备份文件..."
    TIME=$(TZ="Asia/Shanghai" date "+%Y-%m-%d-%H%M%S")
    BACKUP_FILE="dashboard-$TIME.tar.gz"
    
    # 查找自定义主题目录 (名字中包含 custom) 并与 data 目录一起打包
    # 如果 resource 目录不存在或没有 custom 主题，则只打包 data 目录
    if [ -d "resource" ] && [ -n "$(find resource/ -type d -name '*custom*')" ]; then
        find resource/ -type d -name "*custom*" | tar czvf "/tmp/$GH_REPO/$BACKUP_FILE" -T- data/
    else
        tar czvf "/tmp/$GH_REPO/$BACKUP_FILE" data/
    fi
    
    if [ ! -s "/tmp/$GH_REPO/$BACKUP_FILE" ]; then
        control_service "start"
        error "压缩文件失败或文件为空。"
    fi
    info "文件已压缩为: $BACKUP_FILE"
    
    # 上传到 GitHub
    hint "正在上传备份文件至 GitHub..."
    cd /tmp/$GH_REPO || error "进入临时仓库目录失败。"
    
    # 删除旧的备份，仅保留最近 5 个
    find ./ -name '*.gz' | sort | head -n -5 | xargs -r rm -f
    
    # 生成 README.md 文件，内容为最新的备份文件名
    hint "正在生成 README.md..."
    echo "$BACKUP_FILE" > README.md
    
    git config --global user.name "$GH_BACKUP_USER"
    git config --global user.email "$GH_EMAIL"
    git add .
    git commit -m "Backup at $TIME"
    
    if git push -f -u origin main; then
        info "备份文件和 README.md 已成功上传至 GitHub！"
    else
        control_service "start"
        error "上传失败。请检查网络连接或 GitHub PAT 权限。"
    fi

    # 清理并重启服务
    cd "$WORK_DIR"
    rm -rf /tmp/$GH_REPO
    control_service "start"
    info "============== 备份任务执行完毕 =============="
}

# 还原函数
do_restore() {
    info "============== 开始执行还原任务 =============="
    hint "警告: 此操作将覆盖现有的数据和自定义主题！"
    read -p "确定要继续吗? (y/N): " choice
    [[ "$choice" != "y" && "$choice" != "Y" ]] && error "操作已取消。"
    
    # 下载最新的备份文件
    hint "正在获取最新备份文件..."
    LATEST_BACKUP_URL=$(curl -s -H "Authorization: token $GH_PAT" \
      "https://api.github.com/repos/$GH_BACKUP_USER/$GH_REPO/contents/" | \
      grep "download_url" | awk -F '"' '{print $4}' | grep '\.tar\.gz$' | sort -r | head -n 1)
      
    if [ -z "$LATEST_BACKUP_URL" ]; then
        error "无法从 GitHub 仓库获取最新备份文件。请检查仓库配置或 PAT 权限。"
    fi
    
    if ! wget -q -O "/tmp/dashboard_latest.tar.gz" "$LATEST_BACKUP_URL"; then
        error "下载最新备份文件失败。"
    fi
    info "已成功下载最新备份文件。"
    
    # 停止面板服务
    control_service "stop"
    cd "$WORK_DIR" || error "无法进入工作目录: $WORK_DIR"

    # 清理旧文件并解压
    hint "正在清理旧数据并应用备份..."
    rm -rf "${WORK_DIR}/data"
    rm -rf $(find "${WORK_DIR}/resource" -type d -name '*custom*')
    
    if ! tar xzvf "/tmp/dashboard_latest.tar.gz" -C "$WORK_DIR/"; then
        control_service "start"
        rm -f "/tmp/dashboard_latest.tar.gz"
        error "解压备份文件失败。面板数据可能已损坏！"
    fi
    
    # 清理并重启服务
    rm -f "/tmp/dashboard_latest.tar.gz"
    control_service "start"
    info "============== 还原任务执行完毕 =============="
}

# --- 主逻辑 ---

# 首先执行依赖检查
check_and_install_dependencies

# 根据传入参数执行对应操作
case "$1" in
    bak)
        do_backup
        ;;
    res)
        do_restore
        ;;
    *)
        echo "使用方法:"
        echo "  $0 bak   - 执行备份"
        echo "  $0 res   - 执行还原"
        exit 1
        ;;
esac
