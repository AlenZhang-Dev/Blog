'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  filename: string;
  title: string;
  description: string;
  category: string;
  date: string;
  path: string;
}

// 示例摄影作品数据
const sampleImages: GalleryImage[] = [
  {
    id: '1',
    filename: 'sunset-landscape.jpg',
    title: '黄昏时分',
    description: '夕阳西下时的山间美景，温暖的光线洒在大地上',
    category: '风景',
    date: '2025-08-10',
    path: '/images/gallery/sunset-landscape.jpg'
  },
  {
    id: '2',
    filename: 'city-night.jpg',
    title: '城市夜景',
    description: '城市华灯初上的美丽夜景，车流如星河般闪耀',
    category: '城市',
    date: '2025-08-09',
    path: '/images/gallery/city-night.jpg'
  },
  {
    id: '3',
    filename: 'portrait-smile.jpg',
    title: '温暖笑容',
    description: '自然光下捕捉到的真诚笑容，温暖而治愈',
    category: '人像',
    date: '2025-08-08',
    path: '/images/gallery/portrait-smile.jpg'
  },
  {
    id: '4',
    filename: 'street-life.jpg',
    title: '街头瞬间',
    description: '街头抓拍的生活瞬间，记录平凡中的美好',
    category: '街拍',
    date: '2025-08-07',
    path: '/images/gallery/street-life.jpg'
  },
  {
    id: '5',
    filename: 'nature-macro.jpg',
    title: '微观世界',
    description: '花朵上的露珠，展现大自然的精细之美',
    category: '微距',
    date: '2025-08-06',
    path: '/images/gallery/nature-macro.jpg'
  },
  {
    id: '6',
    filename: 'architecture.jpg',
    title: '建筑之美',
    description: '现代建筑的线条与光影，展现几何美学',
    category: '建筑',
    date: '2025-08-05',
    path: '/images/gallery/architecture.jpg'
  }
];

const categories = ['全部', '风景', '人像', '街拍', '城市', '微距', '建筑'];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(sampleImages);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === '全部' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors font-semibold">
              相册
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
              管理
            </Link>
          </div>
        </div>
      </nav>

      {/* 页面标题 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📸 摄影作品集
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            用镜头记录生活的美好瞬间，分享光影中的故事
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 图片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              {/* 图片占位符 */}
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">{image.title}</p>
                    <p className="text-xs text-gray-400">{image.category}</p>
                  </div>
                </div>
                {/* 悬停效果 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                  <p className="text-gray-200 text-xs">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 添加新作品按钮 */}
        <div className="text-center mt-12">
          <Link
            href="/admin/gallery"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            上传新作品
          </Link>
        </div>

        {/* 使用提示 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📷 摄影师提示</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>📁 图片上传：</strong>将图片放在 <code>public/images/gallery/</code> 目录下</p>
            <p><strong>🏷️ 图片命名：</strong>建议使用描述性的英文名称，如 <code>sunset-landscape.jpg</code></p>
            <p><strong>📝 添加描述：</strong>在管理页面为每张图片添加标题和描述</p>
            <p><strong>🎨 分类管理：</strong>按主题给图片分类，方便访客浏览</p>
          </div>
        </div>
      </div>

      {/* 图片详情模态框 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
                  <p className="text-sm text-gray-500">{selectedImage.category} • {selectedImage.date}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* 图片占位符 */}
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg font-medium">{selectedImage.title}</p>
                  <p className="text-sm">将在此处显示高清图片</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
