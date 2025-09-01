## 官方资源

- 官方文档：https://doc.oplist.org/
- 官方仓库：https://github.com/OpenListTeam/OpenList
- 官方桌面版：https://github.com/OpenListTeam/OpenList-Desktop
- 官方安卓版：https://github.com/OpenListTeam/OpenList-Mobile
- 官方 CF WORKER 转发代码：https://github.com/OpenListTeam/OpenList-Proxy

## 所需环境变量

- **ADDRESS**：alist 服务端地址，示例：https://alist.domain.com
- **WORKER_ADDRESS**：部署本 worker 后得到的地址，可以绑定域名，示例：https://alist.worker.com
- **DISABLE_SIGN**：是否关闭签名验证，默认 false，这里需要设置为 true
- **TOKEN**：alist 的 api token，示例：alist-xxxxxxxxxxxxxxxxxx

## 修改源码

在你部署的 alist 的服务器上找到这个文件：/etc/openlist/config.json

修改 site_url 字段为你部署的 worker 域名，然后重启 alist 容器

```json
"site_url": "https://alist.worker.com",
```

## 修改 Alist 后台配置

依次点开 AList 管理 → 设置 → 全局，`直链有效期`设为 0 ，`签名所有`取消勾选

依次点开 AList 管理 → 存储，找到挂载点，点击`编辑`，修改如下配置后保存:
- `web 代理`：开启
- `下载代理 URL`：改为部署的 worker 地址，如 https://alist.worker.com
- `启用签名`：关闭

## 直链地址示例

```txt
https://alist.worker.com/aliyun/2024-10-test.webp
```
