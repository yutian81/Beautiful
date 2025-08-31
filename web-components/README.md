## font-awesome 图标引入

head 头部添加一下cdn

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## 页脚版权信息

```html
<footer>
  <p>
    <span><i class="fas fa-copyright"></i> 2025 Copyright by Yutian81</span><span>|</span>
    <a href="https://github.com/yutian81/CF-tgfile" target="_blank">
    <i class="fab fa-github"></i> Github</a><span>|</span>
    <a href="https://blog.811520.xyz/" target="_blank">
    <i class="fas fa-blog"></i> QingYun Blog</a>
  </p>
</footer>
```

配套的css

```css
/* 版权页脚 */
footer {
  font-size: 0.85rem;
  width: 100%;
  text-align: center;
}
footer p {
  color: #7F7F7E;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
}
footer a {
  color: #7F7F7E;
  text-decoration: none;
  transition: color 0.3s ease;
}
footer a:hover {
  color: #007BFF !important;
}
```
