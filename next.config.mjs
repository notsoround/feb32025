/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/chat',
        headers: [
          { key: 'Upgrade', value: 'websocket' },
          { key: 'Connection', value: 'Upgrade' }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/Realtime_chatgpt_jan2025',
        destination: '/chat',
        permanent: true,
      },
      {
        source: '/realtime-chatgpt-jan2025',
        destination: '/chat',
        permanent: true,
      }
    ];
  },
};
export default nextConfig;
