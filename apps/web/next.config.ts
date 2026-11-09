import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Paquets internes servis en source TypeScript.
  transpilePackages: ["@sillon/ui", "@sillon/shared-types"],
  // Éco-conception : formats d'image modernes uniquement.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
