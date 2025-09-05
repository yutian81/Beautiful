## 适用

老王的 xhttp 直连[容器项目](https://github.com/eooce/serverless-xhttp)，使用 CF WORKER 反代项目地址为节点套上 CF cdn

## 部署到 CF WORKER

- **修改代码第一行**

```js
const UPSTREAM_URL = 'https://xxxxxx.deno.dev'; // 此处替换为部署好的容器项目地址
```

- **绑定自定义域名**

- **将自定义域名替换容器 xhttp 节点的 host 和 sni**

- **修改入口地址为 CF CDN 域名（如 time.js）或优选IP**
