import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  content?: string;
  tags?: string[];
}

// 确保 posts 目录存在
export function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// 获取所有博客文章
export function getAllPosts(): BlogPost[] {
  ensurePostsDirectory();
  
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
          id,
          title: matterResult.data.title || id,
          date: matterResult.data.date || new Date().toISOString().split('T')[0],
          excerpt: matterResult.data.excerpt || '',
          image: matterResult.data.image || null,
          tags: matterResult.data.tags || [],
        };
      });

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

// 根据 ID 获取单篇文章
export async function getPostData(id: string): Promise<BlogPost | null> {
  ensurePostsDirectory();
  
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // 使用 remark 处理 markdown 内容
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      title: matterResult.data.title || id,
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      excerpt: matterResult.data.excerpt || '',
      image: matterResult.data.image || null,
      content: contentHtml,
      tags: matterResult.data.tags || [],
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

// 保存文章
export function savePost(id: string, frontMatter: any, content: string): boolean {
  ensurePostsDirectory();
  
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = matter.stringify(content, frontMatter);
    fs.writeFileSync(fullPath, fileContent, 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving post:', error);
    return false;
  }
}

// 删除文章
export function deletePost(id: string): boolean {
  ensurePostsDirectory();
  
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}

// 获取文章的原始 Markdown 内容
export function getPostMarkdown(id: string): { frontMatter: any; content: string } | null {
  ensurePostsDirectory();
  
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      frontMatter: matterResult.data,
      content: matterResult.content,
    };
  } catch (error) {
    console.error('Error reading post markdown:', error);
    return null;
  }
}
