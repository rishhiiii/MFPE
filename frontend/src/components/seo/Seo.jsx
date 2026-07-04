import { useEffect } from 'react';
import { SITE, absoluteUrl } from '../../lib/seoConfig';

/**
 * Imperative <head> manager. Works with any React version and guarantees a
 * single instance of each managed tag (no duplicates on route changes).
 *
 * Props:
 *  - title        page title (site name is appended automatically)
 *  - description  meta description
 *  - keywords     array or comma string
 *  - path         canonical path, e.g. "/shop" (defaults to current path)
 *  - image        absolute or root-relative OG/Twitter image
 *  - type         Open Graph type: "website" | "product" | "article"
 *  - noindex      when true, tells crawlers not to index the page
 *  - jsonLd       object or array of JSON-LD structured-data objects
 */
const MANAGED = 'data-seo';

function upsertMeta(selectorAttr, key, content) {
  if (content == null || content === '') return;
  const selector = `meta[${selectorAttr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(selectorAttr, key);
    el.setAttribute(MANAGED, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('content', String(content));
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"][${MANAGED}="true"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({
  title,
  description = SITE.description,
  keywords,
  path,
  image = SITE.ogImage,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  useEffect(() => {
    const fullTitle =
      !title || title === SITE.name
        ? SITE.name
        : title.includes(SITE.shortName) || title.includes(SITE.name)
          ? title
          : `${title} | ${SITE.shortName}`;

    const canonical = absoluteUrl(path || window.location.pathname);
    const ogImage = absoluteUrl(image);
    const kw = Array.isArray(keywords) ? keywords.join(', ') : keywords;

    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    if (kw) upsertMeta('name', 'keywords', kw);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertLink('canonical', canonical);

    // Open Graph
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:locale', SITE.locale);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    // JSON-LD structured data (page-scoped; replaced on each route change).
    const existing = document.head.querySelectorAll(`script[${MANAGED}-jsonld="true"]`);
    existing.forEach((n) => n.remove());
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((block) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute(`${MANAGED}-jsonld`, 'true');
        script.text = JSON.stringify(block);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Clean up page-scoped JSON-LD when leaving the route.
      document
        .head.querySelectorAll(`script[${MANAGED}-jsonld="true"]`)
        .forEach((n) => n.remove());
    };
  }, [title, description, keywords, path, image, type, noindex, jsonLd]);

  return null;
}
