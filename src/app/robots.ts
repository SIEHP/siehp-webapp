import { SIEHPConfig } from "@/shared/config/siehpConfig";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SIEHPConfig.BASE_URL}/sitemap.xml`,
  };
}
