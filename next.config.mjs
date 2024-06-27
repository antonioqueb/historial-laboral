/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'historiallaboral.com',
                port: '80',
                pathname: '/uploads/**',
            },
        ],
        unoptimized: true, // Deshabilitar la optimización de imágenes de Next.js
    },
};

export default nextConfig;
