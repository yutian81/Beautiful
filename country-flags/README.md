## 引入 cdn

```html
<script src="https://cdn.jsdelivr.net/gh/yutian81/cdn@main/country-flags/flags_v1.0.0.js"></script>
```

## 使用

### 基本用法

```html
<script>
  console.log(flags.get("US")); // 返回 🇺🇸
  console.log(flags.info("CN")); // 返回 {emoji: "🇨🇳", code: "CN", name: "中国", region: "asia"}
  console.log(flags.region("asia")); // 返回 ["CN", "JP", ...]
  console.log(flags.search("美国")); // 返回 ["US"]
</script>
```

### 增强搜索

```html
<script>
  flags.searchFull = (query) => flags.search(query).map(c => flags.info(c));
    console.log(flags.searchFull("中国"));
    console.log(flags.searchFull("中"));
</script>
```
返回：`{emoji: "🇨🇳", code: "CN", name: "中国", region: "asia"}`
