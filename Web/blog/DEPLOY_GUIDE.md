# GitHub Pages 部署指南 🚀

本指南将帮助您将博客部署到 GitHub Pages，实现免费的静态网站托管。

## 📋 部署步骤

### 1. 准备 GitHub 仓库

1. **创建 GitHub 仓库**
   ```bash
   # 在 GitHub 上创建新仓库，例如：my-blog
   # 或使用 username.github.io 作为仓库名（推荐）
   ```

2. **初始化本地仓库**
   ```bash
   cd /path/to/your/blog
   git init
   git add .
   git commit -m "Initial commit: Personal blog with Next.js"
   git branch -M main
   git remote add origin https://github.com/username/your-repo-name.git
   git push -u origin main
   ```

### 2. 配置 GitHub Pages

1. **进入仓库设置**
   - 在 GitHub 仓库页面，点击 `Settings`
   - 滚动到 `Pages` 部分

2. **配置构建源**
   - Source: `GitHub Actions`
   - 保存设置

### 3. 触发自动部署

提交代码到 `main` 分支会自动触发部署：

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 4. 访问您的博客

部署完成后，您的博客将在以下地址可用：

- **如果仓库名是 `username.github.io`**: 
  - https://username.github.io

- **如果仓库名是其他名称（如 `my-blog`）**: 
  - https://username.github.io/my-blog
  - 需要更新 `next.config.ts` 中的 `basePath`

## ⚙️ 配置说明

### 静态导出配置

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',           // 启用静态导出
  trailingSlash: true,        // 添加尾部斜杠
  images: { unoptimized: true }, // 禁用图片优化
  // basePath: '/repo-name',   // 如果不是 username.github.io
};
```

### 自定义域名（可选）

1. 在仓库根目录创建 `CNAME` 文件：
   ```
   yourdomain.com
   ```

2. 在域名商处设置 CNAME 记录：
   ```
   www.yourdomain.com → username.github.io
   ```

## 📝 内容管理

### 添加新文章

**方法一：直接编辑**
1. 在 `posts/` 目录创建 `.md` 文件
2. 提交并推送到 GitHub
3. 自动部署更新

**方法二：使用在线编辑器**
1. 访问 `/admin/editor` 页面
2. 编写文章内容
3. 下载生成的 `.md` 文件
4. 将文件上传到 `posts/` 目录

### 添加图片

1. **文章配图**：放入 `public/images/posts/`
2. **相册图片**：放入 `public/images/gallery/`
3. **在 Markdown 中引用**：
   ```markdown
   ![描述](/images/posts/your-image.jpg)
   ```

## 🛠️ 高级配置

### 自定义构建脚本

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "export": "next export",
    "deploy": "npm run build && touch out/.nojekyll"
  }
}
```

### 禁用 Jekyll 处理

GitHub Pages 默认使用 Jekyll。添加 `.nojekyll` 文件禁用：

```bash
# 在 public/ 目录创建 .nojekyll 文件
touch public/.nojekyll
```

## 📊 监控部署

### 查看部署状态

1. 进入 GitHub 仓库
2. 点击 `Actions` 标签页
3. 查看最新的工作流运行状态

### 常见问题

**部署失败**
- 检查 Node.js 版本兼容性
- 确认所有依赖已正确安装
- 查看 Actions 日志中的错误信息

**页面显示 404**
- 确认 `basePath` 配置正确
- 检查文件路径大小写
- 确认 GitHub Pages 已启用

**图片不显示**
- 确认图片路径正确
- 图片文件名避免中文和特殊字符
- 检查 `images.unoptimized: true` 配置

## 🚀 性能优化

### 图片优化

```bash
# 推荐图片规格
- 格式：JPG/PNG/WEBP
- 尺寸：1920x1080 以下
- 大小：500KB 以下
```

### 构建优化

```javascript
// next.config.ts 额外配置
{
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}
```

## 📞 技术支持

如果遇到问题：

1. **检查文档**：阅读 Next.js 和 GitHub Pages 官方文档
2. **查看日志**：检查 GitHub Actions 的构建日志
3. **社区支持**：在 GitHub Issues 或相关论坛求助

---

**恭喜！** 您的博客现在已成功部署到 GitHub Pages。享受免费的静态网站托管服务吧！ 🎉
