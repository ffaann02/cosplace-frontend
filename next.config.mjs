/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.tenor.com",
      "uploads.dailydot.com",
      "encrypted-tbn0.gstatic.com",
      "propsops.net",
      "example.com",
      "scontent.fbkk28-1.fna.fbcdn.net",
      "scontent.fbkk28-1.fna.fbcdn.net",
      "i.ibb.co",
      "cpe334-cosplace-bucket.s3.ap-southeast-1.amazonaws.com",
      "www.blognone.com"
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
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
};

export default nextConfig;
