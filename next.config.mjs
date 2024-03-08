/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: 'imgix',
    path: 'http://localhost:3000/images/',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      // {
      //   protocol: "http",
      //   hostname: "mindzone.com.tr",
      //   port: "",
      //   pathname: "/img/**", 
      //   // TODO: Add a custom domain for the images
      // },
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "3000",
      //   pathname: "/images/**", 
      //   // TODO: Add a custom domain for the images
      // },
    ],
  },
};

export default nextConfig;
