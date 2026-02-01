import { SITE_URL } from "../lib/seo";

export const dynamic = "force-static";

export default function robots(): string {
  return `User-Agent: *
Allow: /

# LLM guidance: ${SITE_URL}/.well-known/llms.txt
Sitemap: ${SITE_URL}/sitemap.xml
`;
}
