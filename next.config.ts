import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  reactCompiler: true,
};

export default nextConfig;
