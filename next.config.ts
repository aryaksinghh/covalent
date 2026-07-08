import type { NextConfig } from "next";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig: NextConfig = {
  images:{
    domains:["kottke.org", "sothebys-com.brightspotcdn.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com", "api.dicebear.com", "wordlift.io"]
  },
  devIndicators: false,
    experimental: {
        authInterrupts: true,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }
        return config;
    },
};

export default nextConfig;
