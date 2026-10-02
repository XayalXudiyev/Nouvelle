import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tam statik sayt (SSG): `next build` -> `out/` qovluğu, istənilən statik hostinqə yüklənə bilər.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  experimental: { globalNotFound: true },
};

export default nextConfig;
