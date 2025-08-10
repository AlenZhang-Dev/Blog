import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostData, getAllPosts } from "@/lib/posts-static";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Post({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostData(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            我的博客
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              首页
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              关于
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors">
              相册
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
              管理
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="max-w-3xl">
          {/* 返回按钮 */}
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>

          {/* 文章头部 */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-500 mb-6">
              <time dateTime={post.date}>{post.date}</time>
            </div>
            
            {/* 文章图片占位 */}
            <div className="h-64 bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">文章配图位置</p>
              </div>
            </div>
          </header>

          {/* 文章内容 */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>

        {/* 文章导航 */}
        <div className="max-w-3xl mt-12 pt-8 border-t border-gray-100">
          <div className="flex justify-between">
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-100 mt-12 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-500">
          <p>&copy; 2025 我的博客. 记录生活，分享美好.</p>
        </div>
      </footer>
    </div>
  );
}
