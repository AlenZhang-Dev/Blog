// 静态模式下的博客文章数据
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  content?: string;
  tags?: string[];
}

// 示例文章数据 - 在静态模式下使用
const staticPosts: BlogPost[] = [
  {
    id: "my-first-markdown-post",
    title: "我的第一篇 Markdown 博客",
    date: "2025-08-10",
    excerpt: "这是使用 Markdown 格式写的博客文章，支持丰富的格式和语法。",
    image: "/markdown-demo.jpg",
    tags: ["Markdown", "博客", "写作"]
  },
  {
    id: "online-editor-guide",
    title: "如何在线编辑博客",
    date: "2025-08-10",
    excerpt: "介绍如何使用在线编辑器功能，让博客写作变得更加便捷。",
    image: "/online-editor.jpg",
    tags: ["编辑器", "工具", "指南"]
  },
  {
    id: "photography-tips-and-experience",
    title: "光影之间 - 我的摄影心得",
    date: "2025-08-10",
    excerpt: "分享业余摄影师的拍摄心得，从光线运用到构图技巧，记录摄影路上的点点滴滴。",
    image: "/images/posts/photography-tips.jpg",
    tags: ["摄影", "光影", "构图", "心得分享"]
  }
];

// 静态模式下的文章内容
const staticContent: Record<string, string> = {
  "my-first-markdown-post": `
    <h1>欢迎使用 Markdown 写博客！</h1>
    <p>这是一篇使用 <strong>Markdown</strong> 格式编写的博客文章。现在你可以用更简单的方式来写博客了！</p>
    <h2>✨ Markdown 的优势</h2>
    <ul>
      <li><strong>简单易学</strong> - 使用简单的标记语法</li>
      <li><strong>格式丰富</strong> - 支持标题、列表、链接、图片等</li>
      <li><strong>专注内容</strong> - 不用担心复杂的 HTML 标签</li>
      <li><strong>跨平台兼容</strong> - 任何文本编辑器都能编辑</li>
    </ul>
    <p>现在你可以用熟悉的 Markdown 语法来写博客了！享受更简单、更高效的写作体验吧！</p>
  `,
  "online-editor-guide": `
    <h1>在线编辑器使用指南 ✏️</h1>
    <p>现在你可以直接在浏览器中编辑和创建博客文章了！不需要使用代码编辑器，让写作变得更加简单。</p>
    <h2>🌟 主要功能</h2>
    <ul>
      <li><strong>实时预览</strong> - 左侧编辑 Markdown，右侧实时预览效果</li>
      <li><strong>文件管理</strong> - 创建新文章、编辑现有文章</li>
      <li><strong>语法高亮</strong> - Markdown 语法高亮显示</li>
    </ul>
    <p>现在就去尝试在线编辑器吧！享受便捷的博客写作体验。</p>
  `,
  "photography-tips-and-experience": `
    <h1>光影之间 - 我的摄影心得 📸</h1>
    <p>作为一名业余摄影师，我一直相信摄影不仅仅是按下快门那么简单。它是对光影的理解，对瞬间的捕捉，对生活的热爱。</p>
    <h2>✨ 光线是摄影的灵魂</h2>
    <blockquote>
      <p>"摄影是光的艺术" - 这句话我至今深信不疑。</p>
    </blockquote>
    <h3>黄金时间</h3>
    <p>每天最美的光线出现在：</p>
    <ul>
      <li><strong>日出后一小时</strong> - 温暖柔和的光线</li>
      <li><strong>日落前一小时</strong> - 金黄色的魔法时刻</li>
    </ul>
    <h2>🎯 构图的艺术</h2>
    <p>三分法则是最基础也是最有效的构图方法。将画面分为九等份，将主体放在交叉点上，可以让照片更有层次感。</p>
    <p>希望我的分享能对同样热爱摄影的朋友有所帮助。让我们一起在光影之间，记录生活的美好！</p>
  `
};

// 获取所有文章 - 静态版本
export function getAllPosts(): BlogPost[] {
  return staticPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 获取单篇文章 - 静态版本
export async function getPostData(id: string): Promise<BlogPost | null> {
  const post = staticPosts.find(p => p.id === id);
  if (!post) return null;
  
  return {
    ...post,
    content: staticContent[id] || '<p>内容加载中...</p>'
  };
}

// 静态模式下的其他函数（兼容性）
export function ensurePostsDirectory() {
  // 静态模式下不需要操作
}

export function savePost(id: string, frontMatter: any, content: string): boolean {
  console.log('静态模式下无法保存文件');
  return false;
}

export function deletePost(id: string): boolean {
  console.log('静态模式下无法删除文件');
  return false;
}

export function getPostMarkdown(id: string): { frontMatter: any; content: string } | null {
  const post = staticPosts.find(p => p.id === id);
  if (!post) return null;
  
  return {
    frontMatter: {
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      image: post.image,
      tags: post.tags
    },
    content: staticContent[id] || ''
  };
}
