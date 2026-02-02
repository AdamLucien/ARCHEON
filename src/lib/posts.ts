import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentLanguage = "en" | "cs";

export interface PostFrontMatter {
  title?: string;
  date?: string;
  excerpt?: string;
}

export interface BlogPost {
  slug: string;
  topicSlug: string;
  lang: ContentLanguage;
  title: string;
  date: string;
  excerpt?: string;
  contentMarkdown: string;
}

const POSTS_DIR = path.join(process.cwd(), "docs", "_posts");
const FILE_PATTERN = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)-(\d{6})-(en|cs)\.md$/;

const cachedPosts = loadPosts();

function parseDateFromParts(date: string, time: string): string {
  const iso = `${date}T${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}Z`;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) {
    return `${date}T00:00:00Z`;
  }
  return parsed.toISOString();
}

function normalizeDate(raw: string | undefined, fallback: string): string {
  if (!raw) {
    return fallback;
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }
  return parsed.toISOString();
}

function loadPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  const filenames = fs.readdirSync(POSTS_DIR);
  const posts: BlogPost[] = [];

  for (const filename of filenames) {
    const match = filename.match(FILE_PATTERN);
    if (!match) {
      continue;
    }

    const [, date, topicSlug, time, lang] = match;
    if (!topicSlug || !lang || !date || !time) {
      continue;
    }

    const absolutePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(absolutePath, "utf-8");
    const { content, data } = matter(raw);
    const frontMatter = data as PostFrontMatter;

    const fileDate = parseDateFromParts(date, time);
    const normalizedDate = normalizeDate(
      typeof frontMatter.date === "string" ? frontMatter.date : undefined,
      fileDate
    );

    const title = frontMatter.title?.trim() || topicSlug.replace(/-/g, " ");
    const excerpt = frontMatter.excerpt?.trim();
    const contentMarkdown = content.trim();
    const compactDate = date.replace(/-/g, "");
    const uniqueSlug = `${topicSlug}-${compactDate}-${time}`;

    posts.push({
      slug: uniqueSlug,
      topicSlug,
      lang: lang as ContentLanguage,
      title,
      date: normalizedDate,
      excerpt,
      contentMarkdown,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPosts(): BlogPost[] {
  return cachedPosts;
}

export function getPostsByLang(lang: ContentLanguage): BlogPost[] {
  return cachedPosts.filter((post) => post.lang === lang);
}

export function getPostByLang(lang: ContentLanguage, slug: string): BlogPost | undefined {
  return cachedPosts.find((post) => post.lang === lang && post.slug === slug);
}

export function getLocalizedSlugs(lang: ContentLanguage): string[] {
  return Array.from(new Set(getPostsByLang(lang).map((post) => post.slug)));
}

export function getSlugMapping(): Record<string, Partial<Record<ContentLanguage, BlogPost>>> {
  const map: Record<string, Partial<Record<ContentLanguage, BlogPost>>> = {};
  cachedPosts.forEach((post) => {
    const entry = map[post.slug] ?? {};
    entry[post.lang] = post;
    map[post.slug] = entry;
  });
  return map;
}
