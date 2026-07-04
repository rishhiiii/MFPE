import { useLocation } from 'react-router-dom';
import Seo from './Seo';
import { ROUTE_SEO, SITE } from '../../lib/seoConfig';

// Paths whose pages render their own <Seo> (dynamic/data-driven metadata).
const SELF_MANAGED = [/^\/product\//];

/**
 * Applies per-route SEO metadata for all static pages from a central map.
 * Rendered once inside <Router>. Data-driven pages opt out via SELF_MANAGED
 * and render their own <Seo> instead.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();

  if (SELF_MANAGED.some((re) => re.test(pathname))) return null;

  const config = ROUTE_SEO[pathname];

  // Unknown route: apply safe site defaults so every page still has a canonical
  // title/description rather than inheriting the previous page's tags.
  if (!config) {
    return <Seo title={SITE.name} description={SITE.description} path={pathname} />;
  }

  return (
    <Seo
      title={config.title}
      description={config.description}
      keywords={config.keywords}
      noindex={config.noindex}
      path={pathname}
    />
  );
}
