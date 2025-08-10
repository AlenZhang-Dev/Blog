'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (editId) {
      loadPost(editId);
    }
  }, [editId]);

  const loadPost = async (id: string) => {
    // 静态模式下的提示
    alert('静态网站模式下，编辑功能有限。建议直接编辑 posts/' + id + '.md 文件');
  };

  const insertImage = () => {
    const imageUrl = prompt('请输入图片路径（例如：/images/posts/my-photo.jpg）:');
    if (imageUrl) {
      const altText = prompt('请输入图片描述（用于 alt 属性）:') || '图片';
      const imageMarkdown = `![${altText}](${imageUrl})`;
      setContent(prev => prev + '\n\n' + imageMarkdown);
    }
  };

  const insertGallery = () => {
    const galleryMarkdown = `
## 📷 相册展示

![风景照片](/images/gallery/landscape.jpg)
*美丽的风景照片*

![人像照片](/images/gallery/portrait.jpg)
*温暖的笑容*
`;
    setContent(prev => prev + '\n' + galleryMarkdown);
  };

  const generateId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const savePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('请填写文章标题和内容');
      return;
    }

    setSaving(true);
    
    try {
      const postId = editId || generateId(title);
      const frontMatter = {
        title,
        date: new Date().toISOString().split('T')[0],
        excerpt,
        image: image || undefined,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : undefined,
      };

      // 生成 Markdown 文件内容
      const frontMatterString = Object.entries(frontMatter)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
          }
          return `${key}: "${value}"`;
        })
        .join('\n');
      
      const markdownContent = `---\n${frontMatterString}\n---\n\n${content}`;
      
      // 静态模式下，显示生成的文件内容
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${postId}.md`;
      a.click();
      URL.revokeObjectURL(url);
      
      alert(`文件已下载：${postId}.md\n请将此文件放入 posts/ 目录，然后重新部署网站。`);
      
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  // 简单的 Markdown 预览
  const generatePreview = (text: string) => {
    return text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  };

  useEffect(() => {
    setPreview(generatePreview(content));
  }, [content]);

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-bold text-gray-900">
            {editId ? '编辑文章' : '写新文章'}
          </Link>
          <div className="flex space-x-4">
            <button
              onClick={savePost}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存文章'}
            </button>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
              返回管理
            </Link>
          </div>
        </div>
      </nav>

      {/* 编辑器 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 文章元信息 */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文章标题 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="输入文章标题..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文章摘要
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="一句话描述文章内容..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              配图路径
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="/images/article.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签 (用逗号分隔)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="生活, 思考, 摄影"
            />
          </div>
        </div>

        {/* 编辑器和预览 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Markdown 编辑器 */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Markdown 编辑器</h3>
              <div className="flex space-x-2">
                <button
                  onClick={insertImage}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 border border-blue-300 rounded"
                  title="插入图片"
                >
                  🖼️ 图片
                </button>
                <button
                  onClick={insertGallery}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium px-3 py-1 border border-purple-300 rounded"
                  title="插入相册"
                >
                  📸 相册
                </button>
                <span className="text-sm text-gray-500">支持 Markdown 语法</span>
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
              placeholder="在这里使用 Markdown 语法编写文章内容...

# 标题
## 二级标题

**粗体文字** *斜体文字* `代码`

- 列表项 1
- 列表项 2

[链接](https://example.com)

> 引用文字

```javascript
// 代码块
console.log('Hello World');
```"
            />
          </div>

          {/* 预览 */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-900">实时预览</h3>
              <span className="text-sm text-gray-500">预览渲染效果</span>
            </div>
            <div 
              className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 overflow-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: preview || '<p class="text-gray-400">预览将显示在这里...</p>' }}
            />
          </div>
        </div>

        {/* 底部工具栏 */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            💡 提示：支持标准 Markdown 语法，包括标题、列表、链接、代码块等
          </div>
          <div className="flex space-x-4">
            <Link
              href="/admin"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </Link>
            <button
              onClick={savePost}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存并发布'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载编辑器...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
