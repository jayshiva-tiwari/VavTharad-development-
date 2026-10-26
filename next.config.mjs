/** @type {import('next').NextConfig} */
const allowedOrigins = [
  'localhost:3000',
  'localhost:8080',
  '127.0.0.1:3000',
  '127.0.0.1:8080',
  'ais-dev-lnxhdd2y7qznlwvc4f4mxh-349467321198.asia-southeast1.run.app',
];

if (process.env.APP_URL) {
  try {
    const host = new URL(process.env.APP_URL).host;
    if (host && !allowedOrigins.includes(host)) {
      allowedOrigins.push(host);
    }
  } catch {}
}

if (process.env.NG_ALLOWED_HOSTS) {
  const hosts = process.env.NG_ALLOWED_HOSTS.split(',');
  for (const h of hosts) {
    const trimmed = h.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  }
}

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: allowedOrigins,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
