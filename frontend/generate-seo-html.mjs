import fs from "node:fs";
import path from "node:path";

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const BANNER_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/homebanner";

const DIST_DIR = path.resolve("dist");
const SITE_URL = "https://www.steelcraftprefab.com";
const GOOGLE_TAG_ID = "G-MK6E9HDEHC";

// Keep this identical to FALLBACK_HEADING in HomeSlider.jsx.
const HOME_FALLBACK_H1 =
  "Premium Prefab Homes, Modular Villas & Resort Cottages";

// =====================================================
// ALL WEBSITE ROUTES
// "h1" is written into the static HTML so crawlers that
// do not run JavaScript still find exactly one <h1>.
// React replaces it as soon as the app loads.
// =====================================================

const PAGES = [
  {
    name: "Home",
    route: "/",
    output: "index.html",
    h1: HOME_FALLBACK_H1,
  },
  {
    name: "Project",
    route: "/projects",
    output: "projects/index.html",
    h1: "Our Prefab Home & Villa Projects",
  },
  {
    name: "Home & Cottage",
    route: "/homes-cottages",
    output: "homes-cottages/index.html",
    h1: "Prefab Homes & Resort Cottages",
  },
  {
    name: "One BHK",
    route: "/work/1bhk",
    output: "work/1bhk/index.html",
    h1: "1 BHK Prefab Home Designs",
  },
  {
    name: "Two BHK",
    route: "/work/2bhk",
    output: "work/2bhk/index.html",
    h1: "2 BHK Prefab Home Designs",
  },
  {
    name: "Three BHK",
    route: "/work/3bhk",
    output: "work/3bhk/index.html",
    h1: "3 BHK Prefab Home Designs",
  },
  {
    name: "Four BHK",
    route: "/work/4bhk",
    output: "work/4bhk/index.html",
    h1: "4 BHK Prefab Home Designs",
  },
  {
    name: "Contact",
    route: "/contact",
    output: "contact/index.html",
    h1: "Contact Steel Craft Prefab",
  },
];

// =====================================================
// HELPERS
// =====================================================

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

function normalizePage(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

// =====================================================
// REMOVE EXISTING PAGE SEO
// Prevent the base HTML template's metadata or schema
// from being copied to every page.
// =====================================================

function removePageSeo(html) {
  // Remove existing title.
  html = html.replace(
    /<title\b[^>]*>[\s\S]*?<\/title>\s*/gi,
    ""
  );

  // Remove standard SEO and Twitter metadata.
  html = html.replace(
    /<meta\b(?=[^>]*\bname=["'](?:description|keywords|twitter:[^"']+)["'])[^>]*>\s*/gi,
    ""
  );

  // Remove Open Graph metadata.
  html = html.replace(
    /<meta\b(?=[^>]*\bproperty=["']og:[^"']+["'])[^>]*>\s*/gi,
    ""
  );

  // Remove existing canonical link.
  html = html.replace(
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi,
    ""
  );

  // Remove existing JSON-LD so each page gets its own schema.
  html = html.replace(
    /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>\s*/gi,
    ""
  );

  // Remove previous custom SEO alt-text attribute.
  html = html.replace(
    /\sdata-seo-alt-text=(["']).*?\1/gi,
    ""
  );

  return html;
}

// =====================================================
// SET OR INSERT META TAGS
// =====================================================

function setMeta(html, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const tag =
    `<meta name="${name}" content="${escapeHTML(content)}">`;

  const regex = new RegExp(
    `<meta\\b(?=[^>]*\\bname=["']${escapedName}["'])[^>]*\\/?>`,
    "i"
  );

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  if (!html.includes("</head>")) {
    throw new Error("Cannot add meta tag: </head> not found.");
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

function setMetaProperty(html, property, content) {
  const escapedProperty = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const tag =
    `<meta property="${property}" content="${escapeHTML(content)}">`;

  const regex = new RegExp(
    `<meta\\b(?=[^>]*\\bproperty=["']${escapedProperty}["'])[^>]*\\/?>`,
    "i"
  );

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  if (!html.includes("</head>")) {
    throw new Error("Cannot add property meta tag: </head> not found.");
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

function setCanonical(html, url) {
  const tag =
    `<link rel="canonical" href="${escapeHTML(url)}">`;

  const regex =
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\/?>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  if (!html.includes("</head>")) {
    throw new Error("Cannot add canonical URL: </head> not found.");
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

function setTitle(html, title) {
  const tag = `<title>${escapeHTML(title)}</title>`;
  const regex = /<title\b[^>]*>[\s\S]*?<\/title>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  if (!html.includes("</head>")) {
    throw new Error("Cannot add title: </head> not found.");
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

// =====================================================
// STATIC H1
// Put an <h1> inside the empty React root so crawlers
// that do not run JavaScript still see a heading.
// It is visually hidden so there is no flash before
// React mounts and replaces the root's contents.
// (This assumes the app uses createRoot, not hydrateRoot.)
// =====================================================

function injectH1(html, text, subtitle = "") {
  const heading = String(text ?? "").trim();
  const sub = String(subtitle ?? "").trim();

  if (!heading) {
    throw new Error("Cannot add <h1>: heading text is empty.");
  }

  const rootRegex = /<div\b[^>]*\bid=["']root["'][^>]*>\s*<\/div>/i;

  if (!rootRegex.test(html)) {
    throw new Error(
      'Cannot add <h1>: empty <div id="root"></div> not found.'
    );
  }

  const h1 =
    `<h1 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">${escapeHTML(heading)}</h1>`;

  // Subtitle becomes a static <h2> (same text the visitor sees).
  const h2 = sub
    ? `<h2 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">${escapeHTML(sub)}</h2>`
    : "";

  return html.replace(rootRegex, (match) =>
    match.replace(/<\/div>\s*$/i, `${h1}${h2}</div>`)
  );
}

// =====================================================
// GOOGLE ANALYTICS
// =====================================================

function addGoogleTag(html) {
  // Remove existing Google Analytics loaders.
  html = html.replace(
    /<script\b(?=[^>]*\bsrc=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"']+["'])[^>]*>[\s\S]*?<\/script>/gi,
    ""
  );

  // Remove an existing Google tag block.
  html = html.replace(
    /<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>/gi,
    ""
  );

  // Remove an existing inline configuration.
  html = html.replace(
    /<script\b[^>]*>[\s\S]*?gtag\(\s*['"]config['"]\s*,[\s\S]*?<\/script>/gi,
    ""
  );

  if (!html.includes("</head>")) {
    throw new Error("Cannot add Google Analytics: </head> not found.");
  }

  const googleTag = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_TAG_ID}');
    </script>
  `;

  return html.replace("</head>", `${googleTag}\n</head>`);
}

// =====================================================
// SCHEMA.ORG
// =====================================================

function setSchema(html, schema) {
  const json = JSON.stringify(schema, null, 2);

  const tag = `
    <!-- Schema.org -->
    <script type="application/ld+json">
${json}
    </script>`;

  const regex =
    /<script\b(?=[^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  if (!html.includes("</head>")) {
    throw new Error("Cannot add Schema.org: </head> not found.");
  }

  return html.replace("</head>", `${tag}\n</head>`);
}

// =====================================================
// FETCH SEO DATA FROM AWS
// If the API is unavailable, still generate page schemas.
// =====================================================

async function fetchSeoItems() {
  console.log("Fetching SEO data from AWS Lambda...");

  try {
    const response = await fetch(SEO_API, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`SEO API returned HTTP ${response.status}`);
    }

    const result = await response.json();

    const seoItems = Array.isArray(result)
      ? result
      : Array.isArray(result?.items)
        ? result.items
        : null;

    if (!seoItems) {
      throw new Error("SEO API returned an invalid data format.");
    }

    console.log(
      "SEO records returned:",
      seoItems.map((item) => item?.page)
    );

    return seoItems;
  } catch (error) {
    console.error(
      "Could not fetch SEO records. Pages will still get schema:",
      error.message
    );

    return [];
  }
}

// =====================================================
// FETCH HOME HEADING FROM ADMIN DASHBOARD
// Uses the same banner API as HomeSlider.jsx so the
// static <h1> matches the live heading. Falls back to
// the default text if the API is unavailable.
// =====================================================

async function fetchHomeHeading() {
  try {
    const response = await fetch(BANNER_API, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`Banner API returned HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return { h1: HOME_FALLBACK_H1, h2: "" };
    }

    const latest = data[data.length - 1];
    const name = String(latest?.name ?? "").trim();
    const subtitle = String(latest?.subtitle ?? "").trim();

    return { h1: name || HOME_FALLBACK_H1, h2: subtitle };
  } catch (error) {
    console.error(
      "Could not fetch home heading. Using fallback:",
      error.message
    );

    return { h1: HOME_FALLBACK_H1, h2: "" };
  }
}

// =====================================================
// VALIDATE CANONICAL URL
// =====================================================

function getCanonicalUrl(seo, page) {
  const fallbackCanonical = `${SITE_URL}${page.route}`;
  const value = String(seo?.canonicalUrl ?? "").trim();

  if (!value) {
    return fallbackCanonical;
  }

  try {
    const parsed = new URL(value);

    const validHost = [
      "www.steelcraftprefab.com",
      "steelcraftprefab.com",
    ].includes(parsed.hostname.toLowerCase());

    if (
      parsed.protocol !== "https:" ||
      !validHost ||
      parsed.pathname.replace(/\/+$/, "") !==
        page.route.replace(/\/+$/, "")
    ) {
      console.warn(
        `Invalid canonical URL for "${page.name}". Using ${fallbackCanonical}`
      );

      return fallbackCanonical;
    }

    return parsed.href;
  } catch {
    console.warn(
      `Invalid canonical URL for "${page.name}". Using ${fallbackCanonical}`
    );

    return fallbackCanonical;
  }
}

// =====================================================
// GENERATE HTML FOR EACH PAGE
// Schema does not depend on saved SEO data.
// =====================================================

function generatePageHTML(template, page, seo = {}) {
  // Start with a clean copy of the base template.
  let html = removePageSeo(template);

  const title = String(seo?.metaTitle ?? "").trim();
  const description = String(seo?.description ?? "").trim();
  const keywords = String(seo?.keywords ?? "").trim();
  const altText = String(seo?.altText ?? "").trim();

  const canonical = getCanonicalUrl(seo, page);
  const ogImage = `${SITE_URL}/assets/steel-craft-og-image.jpg`;

  // Only use custom SEO fields when saved in Admin Dashboard.
  if (title) {
    html = setTitle(html, title);
    html = setMetaProperty(html, "og:title", title);
    html = setMeta(html, "twitter:title", title);
  }

  if (description) {
    html = setMeta(html, "description", description);
    html = setMetaProperty(html, "og:description", description);
    html = setMeta(html, "twitter:description", description);
  }

  if (keywords) {
    html = setMeta(html, "keywords", keywords);
  }

  // Canonical belongs to the current page, even without SEO data.
  html = setCanonical(html, canonical);

  // Open Graph page identity and image.
  html = setMetaProperty(html, "og:type", "website");
  html = setMetaProperty(html, "og:url", canonical);
  html = setMetaProperty(html, "og:site_name", "Steel Craft Prefab");
  html = setMetaProperty(html, "og:image", ogImage);

  // Twitter image metadata.
  html = setMeta(html, "twitter:card", "summary_large_image");
  html = setMeta(html, "twitter:image", ogImage);

  // Store alt text only when supplied by Admin Dashboard.
  if (altText) {
    html = html.replace(
      /<html\b([^>]*)>/i,
      `<html$1 data-seo-alt-text="${escapeHTML(altText)}">`
    );
  }

  // Organization schema.
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Steel Craft Prefab",
    url: `${SITE_URL}/`,
  };

  // Website schema.
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Steel Craft Prefab",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };

  let pageType = "WebPage";

  if (
    page.name === "Project" ||
    page.name === "Home & Cottage"
  ) {
    pageType = "CollectionPage";
  } else if (page.name === "Contact") {
    pageType = "ContactPage";
  }

  // Page schema is always generated.
  // Name and description are included only when saved.
  const pageSchema = {
    "@type": pageType,
    "@id": `${canonical}#webpage`,
    url: canonical,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };

  if (title) {
    pageSchema.name = title;
  }

  if (description) {
    pageSchema.description = description;
  }

  html = setSchema(html, {
    "@context": "https://schema.org",
    "@graph": [organization, website, pageSchema],
  });

  // Static <h1> for crawlers that do not run JavaScript.
  html = injectH1(html, page.h1, page.h2);

  // Preserve Google Analytics.
  html = addGoogleTag(html);

  return html;
}

// =====================================================
// MAIN
// Generate every configured page, with or without SEO.
// =====================================================

async function main() {
  const templatePath = path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      "dist/index.html was not found. Run the Vite build first."
    );
  }

  const template = fs.readFileSync(templatePath, "utf8");

  if (!template.includes("</head>")) {
    throw new Error("Closing </head> tag not found.");
  }

  const [seoItems, homeHeading] = await Promise.all([
    fetchSeoItems(),
    fetchHomeHeading(),
  ]);

  // The Home page heading comes from the Admin Dashboard.
  const homePage = PAGES.find((page) => page.route === "/");

  if (homePage) {
    homePage.h1 = homeHeading.h1;
    homePage.h2 = homeHeading.h2;
  }

  let generatedCount = 0;
  let failedCount = 0;

  for (const page of PAGES) {
    const seo =
      seoItems.find(
        (item) =>
          normalizePage(item?.page) === normalizePage(page.name)
      ) || {};

    try {
      // Never skip a page because SEO is missing.
      const html = generatePageHTML(template, page, seo);
      const outputPath = path.join(DIST_DIR, page.output);

      fs.mkdirSync(path.dirname(outputPath), {
        recursive: true,
      });

      fs.writeFileSync(outputPath, html, "utf8");

      const hasSavedSeo =
        Boolean(String(seo.metaTitle ?? "").trim()) ||
        Boolean(String(seo.description ?? "").trim());

      console.log(
        `GENERATED: ${page.name} — ${
          hasSavedSeo
            ? "Saved SEO fields + schema"
            : "Schema generated without saved SEO"
        }`
      );

      console.log(`File: ${page.output}`);
      console.log(`H1: ${page.h1}`);
      if (page.h2) console.log(`H2: ${page.h2}`);
      generatedCount++;
    } catch (error) {
      console.error(
        `FAILED: ${page.name} — ${error.message}`
      );

      failedCount++;
    }
  }

  console.log("--------------------------------");
  console.log("SEO HTML generation finished.");
  console.log(`Generated pages: ${generatedCount}`);
  console.log(`Failed pages: ${failedCount}`);
  console.log("--------------------------------");

  if (failedCount > 0 || generatedCount !== PAGES.length) {
    throw new Error("Some page HTML files failed to generate.");
  }
}

main().catch((error) => {
  console.error("SEO HTML generation failed:", error.message);
  process.exitCode = 1;
});
