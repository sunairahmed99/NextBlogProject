/** @type {import('next').NextConfig} */


// next.config.js

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tailwindui.com',
              port: '',
              pathname: '**',
            },
          ],
          domains: ['tailwindui.com','images.unsplash.com'],
          dangerouslyAllowSVG: true,
    },
  };
  
  export default  nextConfig;
  
