import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type FAQItem = { q: string; a: string };
export type CTA = { title: string; description: string; buttonText: string; href: string; variant?: "primary" | "soft" };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  pillar?: string;
  readingTime: number;
  wordCount: number;
  html: string;
  raw: string;
  midCta?: CTA;
  finalCta?: CTA;
  faq?: FAQItem[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const MID_MARKER = "<!-- MID_CTA -->";

function splitAtMarker(html: string): { first: string; second: string } {
  const idx = html.indexOf(MID_MARKER);
  if (idx === -1) return { first: html, second: "" };
  return { first: html.slice(0, idx), second: html.slice(idx + MID_MARKER.length) };
}

function readAllRaw(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
      const { data, content } = matter(raw);
      const slug = f.replace(/\.md$/, "");
      const words = content.split(/\s+/).filter(Boolean).length;
      const html = marked.parse(content, { async: false }) as string;
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? "2026-01-01",
        category: (data.category as string) ?? "general",
        pillar: data.pillar as string | undefined,
        readingTime: Math.max(1, Math.round(words / 220)),
        wordCount: words,
        html,
        raw: content,
        midCta: data.midCta as CTA | undefined,
        finalCta: data.finalCta as CTA | undefined,
        faq: data.faq as FAQItem[] | undefined,
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function splitHtmlByMarker(html: string) {
  return splitAtMarker(html);
}

export function getAllPosts(): Post[] {
  return readAllRaw();
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const rest = getAllPosts().filter((p) => p.slug !== current.slug);
  const sameCat = rest.filter((p) => p.category === current.category);
  return [...sameCat, ...rest.filter((p) => !sameCat.includes(p))].slice(0, limit);
}
