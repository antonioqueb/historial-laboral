/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: `${process.env.LOCAL_IP}`,
                port: '3008',
                pathname: '/uploads/**',
            },
        ],
        unoptimized: true, // Deshabilitar la optimización de imágenes de Next.js
    },
};

export default nextConfig;
