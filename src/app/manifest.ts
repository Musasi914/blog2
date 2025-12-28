import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "福沢コウの日記帳",
    short_name: "福沢日記帳",
    description: "福沢コウの自分振り帰り用途のサイトです。",
    start_url: "/",
    display: "standalone",
    background_color: "#242220",
    theme_color: "#e2dad8",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
