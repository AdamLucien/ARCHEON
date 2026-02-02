# ARCHEON – Cloudflare build logic (DO NOT CHANGE)
IMPORTANT:
- Repository root is the website root. The Next.js app at `/` builds the production site.
- Content lives in `/docs`. Markdown posts under `/docs/_posts` feed the localized blog via `src/lib/posts.ts`.
- Autopost workflow writes bilingual entries into `/docs/_posts`; Next reads them at build time.
- Build command: `npm run build`.
- Output directory: `out/`.
- Cloudflare deploy uses the `out/` export (`wrangler publish` or equivalent targeting `out/`).
- There is no secondary Jekyll site or `/docs` deployment; docs are a content source only.
