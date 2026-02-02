import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "../../../lib/seo";
import { getPostsByLang } from "../../../lib/posts";

const CONTENT_LANG_BY_PARAM: Record<string, "en" | "cs"> = {
  en: "en",
  cz: "cs",
};

function resolveLanguage(lang?: string) {
  return CONTENT_LANG_BY_PARAM[lang ?? "en"] ?? "en";
}

function getPageMeta(lang: "en" | "cs") {
  return {
    title: lang === "cs" ? "ARCHEON deník" : "ARCHEON journal",
    description:
      lang === "cs"
        ? "České záznamy ARCHEONu (ΛRCHΞON) podrobně mapují řízení, odpovědnost a infrastrukturu."
        : "English dispatches from ARCHEON (ΛRCHΞON) trace causal governance in the Czech Republic.",
  };
}

export async function generateMetadata({ params }: { params?: { lang?: string | string[] } }): Promise<Metadata> {
  const resolvedLang = Array.isArray(params?.lang) ? params?.lang[0] : params?.lang;
  const lang = resolveLanguage(resolvedLang ?? "en");
  const meta = getPageMeta(lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(`/${lang === "cs" ? "cz" : "en"}/blog`),
    },
  };
}

export default function BlogListPage({
  params,
}: {
  params: { lang: string | string[] };
}) {
  const langParam = Array.isArray(params.lang) ? params.lang[0] : params.lang;
  const lang = resolveLanguage(langParam ?? "en");
  const posts = getPostsByLang(lang);
  const locale = lang === "cs" ? "cs-CZ" : "en-US";
  const heading = lang === "cs" ? "Český deník" : "English journal";
  const summary =
    lang === "cs"
      ? "Kauzální postřehy o infrastruktuře a státním řízení České republiky."
      : "State-level notes on causality, infrastructure, and governance in the Czech Republic.";

  return (
    <section>
      <header>
        <p>ARCHEON (ΛRCHΞON)</p>
        <h1>{heading}</h1>
        <p>{summary}</p>
      </header>
      <div>
        {posts.map((post) => {
          const routeLang = lang === "cs" ? "cz" : "en";
          return (
            <article key={post.slug}>
              <Link href={`/${routeLang}/blog/${post.slug}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>
                {new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p>{post.excerpt ?? `${post.contentMarkdown.slice(0, 200)}…`}</p>
              <p>
                <small>
                  {lang === "cs" ? "Téma" : "Topic"}:{" "}
                  {post.topicSlug.replace(/-/g, " ")}
                </small>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
