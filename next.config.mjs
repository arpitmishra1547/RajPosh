/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;
