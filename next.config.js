const { captureServerConsole, clearLogs } = require('./src/lib/logger-server-side');

// Limpar logs ao iniciar o servidor
clearLogs().catch(() => {});

// Capturar console do servidor
captureServerConsole();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
