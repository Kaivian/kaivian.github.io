import type { NextConfig } from "next";
import { execSync } from "child_process";

/**
 * Retrieves the short Git commit hash.
 * Fallbacks to 'unknown' if git is not initialized or fails.
 */
const getGitCommitHash = (): string => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    return "unknown " + error;
  }
};

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_APP_VERSION:
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || getGitCommitHash(),
  },
};

export default nextConfig;