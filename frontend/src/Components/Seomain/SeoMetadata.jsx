
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const PAGE_ROUTE_MAP = {
  "/": "Home",
  "/projects": "Project",
  "/homes-cottages": "Home & Cottage",
  "/contact": "Contact",
};

const DEFAULT_TITLE = "Steel Craft Prefab";
const DEFAULT_DESCRIPTION =
  "Explore prefab buildings and steel construction solutions from Steel Craft Prefab.";

function setMetaTag(name, content) {
  let element = document.head.querySelector(
    `meta[name="${name}"]`
  );

  if (!content) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonicalUrl(url) {
  let element = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!url) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

export default function SeoMetadata() {
  const { pathname } = useLocation();
  const [seoItems, setSeoItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchSEO() {
      try {
        const response = await fetch(SEO_API);

        if (!response.ok) {
          throw new Error(
            `SEO API failed: ${response.status}`
          );
        }

        const data = await response.json();

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.items)
            ? data.items
            : [];

        if (!cancelled) {
          setSeoItems(items);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Unable to load SEO metadata:", error);

        if (!cancelled) {
          setLoaded(true);
        }
      }
    }

    fetchSEO();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const pageName = PAGE_ROUTE_MAP[pathname];

    // Do not change metadata for admin or unknown routes.
    if (!pageName) return;

    const item = seoItems.find(
      (entry) =>
        entry.page?.toLowerCase() === pageName.toLowerCase()
    );

    // Use existing defaults until SEO data has loaded.
    if (!loaded && !item) return;

    const title = item?.metaTitle?.trim() || DEFAULT_TITLE;
    const description =
      item?.description?.trim() || DEFAULT_DESCRIPTION;

    document.title = title;

    setMetaTag("description", description);
    setMetaTag("keywords", item?.keywords?.trim() || "");

    const canonicalUrl = item?.canonicalUrl?.trim();

    setCanonicalUrl(
      canonicalUrl ||
        `${window.location.origin}${pathname}`
    );
  }, [pathname, seoItems, loaded]);

  return null;
}
