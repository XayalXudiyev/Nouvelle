import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tam statik sayt (SSG): `next build` -> `out/` qovluğu, istənilən statik hostinqə yüklənə bilər.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Telefondan yerli şəbəkə ilə yoxlamaq üçün (npm run dev → http://192.168.x.x:3000)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  reactCompiler: true,
  experimental: { globalNotFound: true },
};

export default nextConfig;
