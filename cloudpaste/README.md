## 仓库

- 原作者：https://github.com/ling-drag0n/CloudPaste
- fork库：https://github.com/yutian81/cloudOSS

## 修改页脚

系统设置——站点设置

- 页脚内容

```html
<p class="footer-copyright">
    <i class="fas fa-copyright mr-1"></i>Copyright 2025<span class="mr-1"></span>
    <a href="https://github.com/ling-drag0n/CloudPaste" target="_blank" class="transition-colors">CloudPaste</a>
    <span class="ml-2 mr-2">|</span>
    <a href="https://github.com/yutian81" target="_blank" class="transition-colors"><i class="fab fa-github mr-1"></i>GitHub</a>
    <span class="ml-2 mr-2">|</span>
    <a href="https://blog.811520.xyz/" target="_blank" class="transition-colors"><i class="fas fa-blog mr-1"></i>QingYun Blog</a>  
</p>
```

- 自定义头部

```css
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<style>
.footer-copyright {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	color: #9ca3af;
	font-size: 0.9rem;
}

.footer-copyright a {
	color: #9ca3af !important;
	text-decoration: none !important;
	transition: color 0.3s ease;
}

.footer-copyright a:hover {
	color: #3B82F6 !important;
}
<style>
```
