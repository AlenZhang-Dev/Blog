# 我的个人博客

一个简洁友好的个人博客网站，专注于分享文字和图片，记录生活中的美好时光。

## 特色功能

- 🎨 **简洁设计** - 干净优雅的界面，专注于内容本身
- 📝 **文字分享** - 记录生活感悟、读书笔记、随想随感
- 📷 **图片展示** - 支持图片展示，分享摄影作品和生活瞬间
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **性能优化** - 基于 Next.js，支持静态生成，加载快速

## 技术栈

- **框架**: Next.js 15 (App Router)
- **开发语言**: TypeScript
- **样式**: Tailwind CSS
- **代码规范**: ESLint

## 快速开始

首先，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
src/
  app/
    page.tsx          # 首页 - 博客文章列表
    about/
      page.tsx        # 关于页面
    posts/
      [id]/
        page.tsx      # 博客文章详情页
    layout.tsx        # 全局布局
    globals.css       # 全局样式
```

## 自定义内容

### 修改博客信息

1. 在 `src/app/page.tsx` 中更新博客标题和介绍
2. 在 `src/app/about/page.tsx` 中更新个人信息和联系方式
3. 在 `src/app/posts/[id]/page.tsx` 中更新博客文章内容

### 添加新文章

在 `src/app/page.tsx` 和 `src/app/posts/[id]/page.tsx` 的 `blogPosts` 数组中添加新的文章对象。

### 更换图片

将图片文件放在 `public/` 目录下，然后在代码中引用相应路径。

## 部署

### 使用 Vercel 部署

最简单的部署方式是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，这是 Next.js 的创建者提供的服务。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多细节。

## 学习资源

- [Next.js 官方文档](https://nextjs.org/docs) - 了解 Next.js 的功能和 API
- [Tailwind CSS 文档](https://tailwindcss.com/docs) - 学习 Tailwind CSS 的使用方法
- [TypeScript 文档](https://www.typescriptlang.org/docs/) - TypeScript 的详细指南

## 开源协议

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。
