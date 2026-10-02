import { MetadataRoute } from "next";
import { authoritativeProductionUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    ...(authoritativeProductionUrl
      ? { sitemap: `${authoritativeProductionUrl}/sitemap.xml` }
      : {}),
  };
}
