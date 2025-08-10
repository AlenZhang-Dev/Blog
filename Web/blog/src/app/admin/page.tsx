'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 在静态网站中，直接使用本地数据
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // 静态模式下，直接从 lib/posts-static 获取数据
      const { getAllPosts } = await import('@/lib/posts-static');
      const data = getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      // 静态模式下显示提示信息
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    alert('静态网站模式下，请手动删除 posts/ 目录中的 .md 文件：' + id + '.md');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            我的博客 - 管理后台
          </Link>
          <div className="flex space-x-4">
            <Link 
              href="/admin/editor" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              新建文章
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              返回首页
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">文章管理</h1>
          <p className="text-gray-600">管理你的博客文章，支持在线编辑和 Markdown 文件上传</p>
        </div>

        {/* 功能按钮 */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/admin/editor"
            className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
          >
            <div className="text-2xl mb-2">📝</div>
            <div>写新文章</div>
            <div className="text-sm opacity-90 mt-1">创建博客文章</div>
          </Link>
          
          <Link 
            href="/admin/gallery"
            className="bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center"
          >
            <div className="text-2xl mb-2">📸</div>
            <div>管理相册</div>
            <div className="text-sm opacity-90 mt-1">上传摄影作品</div>
          </Link>
          
          <label className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer text-center">
            <div className="text-2xl mb-2">📁</div>
            <div>上传 Markdown</div>
            <div className="text-sm opacity-90 mt-1">批量导入文章</div>
            <input
              type="file"
              accept=".md"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  alert('文件上传功能开发中...');
                }
              }}
            />
          </label>
        </div>

        {/* 文章列表 */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">现有文章</h2>
          </div>
          
          {posts.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              还没有文章，<Link href="/admin/editor" className="text-blue-600 hover:text-blue-800">创建第一篇</Link>吧！
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Link
                        href={`/posts/${post.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        target="_blank"
                      >
                        预览
                      </Link>
                      <Link
                        href={`/admin/editor?id=${post.id}`}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 使用说明</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>✨ 在线编辑：</strong>点击"写新文章"或"编辑"按钮，使用在线编辑器创建或修改文章</p>
            <p><strong>📁 文件上传：</strong>直接上传 .md 格式的 Markdown 文件</p>
            <p><strong>📂 手动添加：</strong>也可以直接在 <code>posts/</code> 目录下放置 .md 文件</p>
            <p><strong>🎨 Markdown 语法：</strong>支持标准 Markdown 语法，包括标题、列表、链接、代码块等</p>
          </div>
        </div>
      </main>
    </div>
  );
}
