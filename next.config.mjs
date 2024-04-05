/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  images: {
    loader: "imgix",
    path: "https://mindzone.vercel.app/images/",
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
