## 博客教程

https://blog.811520.xyz/post/2025/08/250809-hexo-jiami/

## 安装加密插件

```bash
npm install --save hexo-blog-encrypt crypto-js
```

## 相关代码

- scripts/shortcode-encrypt.js：本文件夹 shortcode-encrypt.js
- source/js/encrypt.js：本文件夹 encrypt.js
- source/css/encrypt.css：本文件夹 encrypt.css

## 修改配置文件 _config.anzhiyu.yml

- 在 inject: 字段的 head: 字段下引入上述 encrypt.css 文件

```yml
- <link rel="stylesheet" href="/css/encrypt.css">
```

- 在 inject: 字段的 bottom: 字段下引入以下 js 文件

```
- <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
- <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
- <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js"></script>
- <script src="/js/encrypt.js"></script>
```
