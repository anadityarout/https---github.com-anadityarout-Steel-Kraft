
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
        const response = await fetch(SEO_API, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`SEO API failed: ${response.status}`);
        }

        const data = await response.json();

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.items)
            ? data.items
            : [];

        if (!cancelled) {
          setSeoItems(items);
        }
      } catch (error) {
        console.error("Unable to load SEO metadata:", error);
      } finally {
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

  const pageName = PAGE_ROUTE_MAP[pathname];

  const item = seoItems.find(
    (entry) =>
      entry.page?.toLowerCase() === pageName?.toLowerCase()
  );

  useEffect(() => {
    if (!pageName || (!loaded && !item)) return;

    document.title =
      item?.metaTitle?.trim() || DEFAULT_TITLE;

    setMetaTag(
      "description",
      item?.description?.trim() || DEFAULT_DESCRIPTION
    );

    setMetaTag("keywords", item?.keywords?.trim() || "");

    setCanonicalUrl(
      item?.canonicalUrl?.trim() ||
        `${window.location.origin}${pathname}`
    );
  }, [pathname, pageName, item, loaded]);

  useEffect(() => {
    if (!pageName || !loaded || !item) return;

    const altText = item.altText?.trim();
    if (!altText) return;

    const root = document.getElementById("root");
    if (!root) return;

    const applyAltText = () => {
      root.querySelectorAll("img").forEach((img) => {
        img.setAttribute("alt", altText);
      });
    };

    applyAltText();

    const observer = new MutationObserver(() => {
      applyAltText();
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [pathname, pageName, item, loaded]);

  return null;
}
