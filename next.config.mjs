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
        unoptimized: true, // Deshabilitar la optimización de imágenes de Next.js
    },
};

export default nextConfig;
