import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

// ⚠️ Thay bằng tên GitHub repo của bạn
const REPO_NAME = 'cluster-landing-page';

const nextConfig: NextConfig = {
  output: 'export',
  basePath:    isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;