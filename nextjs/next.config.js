const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
	domains: ["localhost"]
  },
  webpack: (config) => {
	config.resolve.alias['public'] = path.join(__dirname, 'public')
	return config
  },
  env: {
    NEXT_PUBLIC_API_SECRET: process.env.API_SECRET,
  },
}

module.exports = nextConfig
