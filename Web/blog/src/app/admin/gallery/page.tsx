'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function GalleryAdminPage() {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (!files.length) return;

    setUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          // 这里将来可以添加实际的文件上传逻辑
          console.log('Uploading:', file.name);
        }
      }
      alert(`成功选择 ${files.length} 张图片！`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-bold text-gray-900">
            相册管理
          </Link>
          <div className="flex space-x-4">
            <Link href="/gallery" className="text-blue-600 hover:text-blue-800 transition-colors">
              查看相册
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
              返回管理
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📸 摄影作品管理</h1>
          <p className="text-gray-600">上传和管理你的摄影作品，展示最美的瞬间</p>
        </div>

        {/* 上传区域 */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <svg className="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {uploading ? '上传中...' : '上传摄影作品'}
                </p>
                <p className="text-gray-500 mt-1">
                  拖拽图片文件到此处，或点击选择文件
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  支持 JPG, PNG, WEBP 格式，建议尺寸 1920x1080 以上
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {uploading ? '上传中...' : '选择图片'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* 上传指南 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">📷 摄影师专业提示</h3>
            <div className="text-blue-800 space-y-2 text-sm">
              <p><strong>图片质量：</strong>上传高分辨率原图，系统会自动优化</p>
              <p><strong>文件命名：</strong>使用描述性英文名称，如 <code>sunset_landscape_2025.jpg</code></p>
              <p><strong>图片尺寸：</strong>建议 1920x1080 或以上分辨率</p>
              <p><strong>文件大小：</strong>单张图片建议不超过 10MB</p>
              <p><strong>色彩管理：</strong>建议使用 sRGB 色彩空间</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">📁 文件管理建议</h3>
            <div className="text-green-800 space-y-2 text-sm">
              <p><strong>分类整理：</strong>按主题创建文件夹（风景、人像、街拍等）</p>
              <p><strong>版权保护：</strong>可在图片上添加水印</p>
              <p><strong>备份管理：</strong>保留原始文件作为备份</p>
              <p><strong>SEO 优化：</strong>添加有意义的 alt 标签</p>
              <p><strong>加载优化：</strong>系统会自动生成不同尺寸的图片</p>
            </div>
          </div>
        </div>

        {/* 当前上传方式说明 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">🛠️ 当前上传方式</h3>
          <div className="text-amber-800 space-y-3">
            <p className="font-medium">现在您可以通过以下方式添加图片：</p>
            <div className="space-y-2">
              <p><strong>1. 直接上传到文件夹：</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>将图片放入 <code>public/images/gallery/</code> 目录</li>
                <li>重启开发服务器即可在相册中看到</li>
              </ul>
              
              <p><strong>2. 在文章中插入图片：</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>将图片放入 <code>public/images/posts/</code> 目录</li>
                <li>在 Markdown 中使用：<code>![描述](/images/posts/图片名.jpg)</code></li>
              </ul>
              
              <p><strong>3. 添加图片信息：</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>在相册页面代码中添加图片的标题、描述等信息</li>
                <li>支持按分类整理和展示</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/gallery"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看相册效果
          </Link>
          <Link
            href="/admin/editor"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            写摄影博客
          </Link>
          <Link
            href="/admin"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            返回管理页面
          </Link>
        </div>
      </div>
    </div>
  );
}
