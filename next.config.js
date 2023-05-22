/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    compiler: {
        removeConsole: process.env.PRODUCTION == "false" ? true : false || true
    }
}

module.exports = nextConfig
