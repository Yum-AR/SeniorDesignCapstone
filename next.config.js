/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [ `firebasestorage.googleapis.com`, `tailwindui.com`, `media.istockphoto.com`, `images.unsplash.com` ],
  },
};

module.exports = nextConfig;
