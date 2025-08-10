import Link from "next/link";

export default function About() {
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
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">关于我</h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                你好！欢迎来到我的个人博客。这里是我分享生活感悟、记录美好瞬间的小天地。
              </p>

              <p className="leading-relaxed">
                我喜欢用文字记录生活中的点点滴滴，用镜头捕捉那些转眼即逝的美好时光。
                在这个快节奏的世界里，我希望能够慢下来，仔细品味生活的每一个细节。
              </p>

              <p className="leading-relaxed">
                在这个博客里，你会看到：
              </p>

              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>生活随笔与感悟</li>
                <li>旅行见闻与摄影作品</li>
                <li>读书笔记与思考</li>
                <li>日常生活的美好瞬间</li>
              </ul>

              <p className="leading-relaxed">
                希望我的分享能够带给你一些温暖和启发。如果你有任何想法或建议，
                都很欢迎与我交流。让我们一起在这个数字世界里，创造属于自己的温馨角落。
              </p>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">联系方式</h3>
                <p className="text-gray-600">
                  如果你想与我交流，可以通过以下方式联系我：
                </p>
                <div className="mt-3 space-y-2 text-gray-600">
                  <p>📧 邮箱：your-email@example.com</p>
                  <p>📱 微信：your-wechat-id</p>
                  <p>📷 Instagram：@your-instagram</p>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  * 这些联系方式是示例，请替换为你的真实联系信息
                </p>
              </div>
            </div>
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
