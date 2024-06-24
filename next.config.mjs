/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.69',
                port: '3008',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
