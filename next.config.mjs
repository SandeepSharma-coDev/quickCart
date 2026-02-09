/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        // 1. Enable SVG support
        dangerouslyAllowSVG: true,
        // 2. Recommended security headers
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
