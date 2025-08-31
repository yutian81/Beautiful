## 仓库资源

原作者：https://github.com/fordes123/ITEM

我fork的：https://github.com/yutian81/ITEM

## 修复原项目站内搜索不生效的问题（serv00 平台）

主题没有重写 /search/ 路由到主页，导致跳转到404报错

修改两处地方：

在根目录新建 .htaccess 文件，内容：

```php
<IfModule mod_rewrite.c>
    Options +FollowSymLinks
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.php/$1 [L]
</IfModule>
```

**初始化之后**修改根目录 `config.inc.php` 文件，增加一行：

```php
/** 开启 URL 重写 */
define('__TYPECHO_REWRITE__', true);
```

现在搜索会正确跳转到 `https://daoyi.hidns.vip/search/关键词`

## 将搜索引擎挪到顶部

打开你的index.php，将下面这段 php 挪到`热门站点`之前

```php
    <!-- 搜索栏-->
    <div class="col-12 mb-4">
      <div id="search" class="search-block card card-xl">
        <div class="card-body">
          <div class="search-tab">
            <?php $search = json_decode($this->options->searchConfig, true);
  if (is_array($search) && count($search) > 0) :
    foreach ($search as $index => $item) : ?>
            <a href='javascript:;' data-url='<?php echo $item['url']; ?>' class='btn btn-link btn-sm btn-rounded <?php echo $index === 0 ? 'active' : ''; ?>'><i class='<?php echo $item['icon']; ?>' aria-hidden='true'></i>&nbsp;<?php echo $item['name']; ?></a>
            <?php endforeach;
    else : ?>
            <a href='javascript:;' data-url='https://www.google.com/search?q=' class='btn btn-link btn-sm btn-rounded active'><i class='fab fa-google'></i>&nbsp;谷歌</a>
            <?php endif; ?>
          </div>
          <form> <input type="text" class="form-control" placeholder="请输入搜索关键词并按回车键…"></form>
        </div>
      </div>
    </div>
```

## 界面美化

- 搜索引擎配置: `search.json`
- 工具直达配置: `tools.json`
- 自定义css：`style.css`
