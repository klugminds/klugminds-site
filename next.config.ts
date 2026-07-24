import type { NextConfig } from 'next';

import { securityHeaders, strictTransportSecurity } from '@/lib/security-headers';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    if (!isProduction) {
      return [];
    }

    return [
      {
        source: '/(.*)',
        headers: [...securityHeaders, strictTransportSecurity],
      },
    ];
  },
};

export default nextConfig;
