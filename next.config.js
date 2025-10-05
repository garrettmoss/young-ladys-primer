/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/young-ladys-primer',
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig