## 仓库资源

- 官方仓库：https://github.com/nezhahq/nezha
- 官方一键安装
  ```bash
  curl -L https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install.sh -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
  ```
- 容器版仓库：https://github.com/Kiritocyz/Argo-Nezha-Service-Container
- 容器版镜像：`mikehand888/argo-nezha:latest`

> 官方版通信域名使用非cdn域名，若未为该域名申请证书，TLS 请选择 N
> 容器版只需要一个域名，agent 对接地址：`argo域名:443`，需要开启 TLS

## 备份和恢复

代码见 `nzbak.sh`，将其上传到 vps 的 /root 目录并填写其中的变量

- 执行备份
```bash
bash nzbak.sh bak
```

- 执行恢复
```bash
bash nzbak.sh res
```

- **定时备份**
```bash
(crontab -l 2>/dev/null | grep -Fq "/root/nzbak.sh bak") || (crontab -l 2>/dev/null; echo '# 每天凌晨4点 (北京时间) 自动执行 Nezha 面板备份任务'; echo '0 20 * * * /bin/bash /root/nzbak.sh bak >/dev/null 2>&1') | crontab -
```

验证corn任务是否添加成功: `crontab -l`

## 开启 github 验证

将 `config.yml` 中的内容留空的部分的填写完整，复制到 vps 的 `/opt/nezha/dashboard/data/config.yaml` 文件中保存

运行以下命令重启 docker

```bash
docker restart nezha-dashboard
```

## 前端自定义代码--个性化页眉页脚

哪吒面板——系统设置——自定义代码，填入 `ui.html` 的内容

修改以下代码：

- 约第4行：`window.CustomBackgroundImage = "https://pan.811520.xyz/icon/bg_dark.webp";` 改为你自己的背景图直链
- 约第14行：`href="https://github.com/yutian81"`，改为你自己的仓库链接
- 约第18行：`href="https://blog.811520.xyz/"`，改为你自己的博客链接
