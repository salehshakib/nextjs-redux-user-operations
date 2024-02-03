/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["tasks.vitasoftsolutions.com"],
    // domains: ["tasks.vitasoftsolutions.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tasks.vitasoftsolutions.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
