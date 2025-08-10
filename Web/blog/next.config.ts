import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 如果你的仓库名不是 username.github.io，需要设置 basePath
  // basePath: '/your-repo-name',
};

export default nextConfig;
