import type { Metadata, PageProps } from "next";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import { absoluteUrl } from "../../../../lib/seo";
import { getPostByLang, getSlugMapping } from "../../../../lib/posts";
const CONTENT_LANG_MAP: Record<"en" | "cz", "en" | "cs"> = {
  en: "en",
  cz: "cs",
};

function normalizeLangParam(value?: string): "en" | "cz" {
  return value === "cz" ? "cz" : "en";
}

function mapToContentLang(langParam: "en" | "cz") {
  return CONTENT_LANG_MAP[langParam];
}

export function generateStaticParams() {
  const mapping = getSlugMapping();
  const params: Array<{ lang: "en" | "cz"; slug: string }> = [];
  Object.entries(mapping).forEach(([slug, bundle]) => {
    if (bundle.en) {
      params.push({ lang: "en", slug });
    }
    if (bundle.cs) {
      params.push({ lang: "cz", slug });
    }
  });
  return params;
}

export const dynamicParams = false;
export const dynamic = "force-static";

type BlogPostProps = PageProps<"/[lang]/blog/[slug]">;

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedLangParam = Array.isArray(resolvedParams?.lang) ? resolvedParams.lang[0] : resolvedParams?.lang;
  const langParam = normalizeLangParam(resolvedLangParam);
  const contentLang = mapToContentLang(langParam);
  const slug = resolvedParams?.slug;
  if (!slug) {
    return { title: "ARCHEON journal — Not found" };
  }
  const post = getPostByLang(contentLang, slug);
  if (!post) {
    return { title: "ARCHEON journal — Not found" };
  }

  const canonicalPrefix = langParam === "cz" ? "cz" : "en";
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: absoluteUrl(`/${canonicalPrefix}/blog/${post.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const resolvedParams = await params;
  const resolvedLangParam = Array.isArray(resolvedParams?.lang) ? resolvedParams.lang[0] : resolvedParams?.lang;
  const langParam = normalizeLangParam(resolvedLangParam);
  const contentLang = mapToContentLang(langParam);
  const slug = resolvedParams?.slug;
  if (!slug) {
    notFound();
  }
  const post = getPostByLang(contentLang, slug);
  if (!post) {
    notFound();
  }

  const content = await remark().use(html).process(post.contentMarkdown);
  const locale = contentLang === "cs" ? "cs-CZ" : "en-US";
  return (
    <article>
      <header>
        <p>{new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</p>
        <h1>{post.title}</h1>
      </header>
      <section dangerouslySetInnerHTML={{ __html: content.toString() }} />
    </article>
  );
}
