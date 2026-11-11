import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/shop',
        destination: '/store',
        permanent: true,
      },
      {
        source: '/shop/:slug',
        destination: '/store/:slug',
        permanent: true,
      },
      {
        source: '/product/:slug',
        destination: '/store/:slug',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/store',
        permanent: true,
      },
      {
        source: '/categories/fashion',
        destination: '/store/fashion',
        permanent: true,
      },
      {
        source: '/categories/accessories',
        destination: '/store/accessories',
        permanent: true,
      },
      {
        source: '/categories/:slug',
        destination: '/store',
        permanent: true,
      },
      {
        source: '/admin/product',
        destination: '/admin/products',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
