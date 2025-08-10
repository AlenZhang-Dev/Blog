---
title: "如何在线编辑博客"
date: "2025-08-10"
excerpt: "介绍如何使用在线编辑器功能，让博客写作变得更加便捷。"
image: "/online-editor.jpg"
---

# 在线编辑器使用指南 ✏️

现在你可以直接在浏览器中编辑和创建博客文章了！不需要使用代码编辑器，让写作变得更加简单。

## 🌟 主要功能

### 1. **实时预览**
- 左侧编辑 Markdown
- 右侧实时预览效果
- 所见即所得的编辑体验

### 2. **文件管理**
- 创建新文章
- 编辑现有文章
- 删除不需要的文章
- 文件列表浏览

### 3. **语法高亮**
- Markdown 语法高亮
- 代码块语法高亮
- 更好的编辑体验

## 📋 使用步骤

### 创建新文章
1. 访问 `/admin` 管理页面
2. 点击"新建文章"按钮
3. 填写文章标题和内容
4. 点击"保存"按钮

### 编辑现有文章
1. 在文章列表中选择要编辑的文章
2. 在编辑器中修改内容
3. 实时查看预览效果
4. 保存修改

### 上传 Markdown 文件
1. 点击"上传文件"按钮
2. 选择 `.md` 格式的文件
3. 系统自动解析并添加到博客

## 💡 写作技巧

### Front Matter 模板
```yaml
---
title: "你的文章标题"
date: "2025-08-10"
excerpt: "一句话描述文章内容"
image: "/article-image.jpg"
tags: ["标签1", "标签2"]
---
```

### 常用 Markdown 语法
```markdown
# 标题

**粗体** *斜体* `代码`

- 列表项
- 列表项

[链接](https://example.com)

![图片](/image.jpg)

> 引用文字

​```javascript
// 代码块
console.log('Hello World');
​```
```

## 🎨 自定义样式

你还可以在 Markdown 中使用一些 HTML 标签来实现更丰富的样式：

<div style="background: #f0f8ff; padding: 1rem; border-radius: 8px;">
📝 <strong>提示框</strong>：使用 HTML div 标签可以创建特殊的内容框。
</div>

<details>
<summary>点击展开更多内容</summary>

这里是折叠的内容，用户可以选择性查看。

</details>

## 🚀 开始使用

现在就去尝试在线编辑器吧！访问 [/admin](/admin) 开始你的博客写作之旅。

---

*Happy Blogging! 🎉*
