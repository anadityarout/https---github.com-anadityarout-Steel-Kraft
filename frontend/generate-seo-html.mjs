import fs from "node:fs";
import path from "node:path";

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const BANNER_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/homebanner";

const DIST_DIR = path.resolve("dist");
const SITE_URL = "https://www.steelcraftprefab.com";

const GOOGLE_TAG_ID = "G-MK6E9HDEHC";
const OG_IMAGE_PATH = "/og/steel-craft-prefab-og.jpg";

const HOME_FALLBACK_H1 =
  "Premium Prefab Homes, Modular Villas & Resort Cottages";

// =====================================================
// ALL WEBSITE ROUTES
// =====================================================

const PAGES = [
  {
    name: "Home",
    route: "/",
    output: "index.html",
    h1: HOME_FALLBACK_H1,
  },
  {
    name: "About",
    route: "/about",
    output: "about/index.html",
    h1: "About Steel Kraft Prefab",
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// =====================================================
// REMOVE EXISTING PAGE SEO
// =====================================================

function removePageSeo(html) {
  html = html.replace(
    /<title\b[^>]*>[\s\S]*?<\/title>/i,
    ""
  );

  html = html.replace(
    /<meta\b(?=[^>]*\bname=["'](?:description|keywords|twitter:[^"']+)["'])[^>]*>\s*/gi,
    ""
  );

  html = html.replace(
    /<meta\b(?=[^>]*\bproperty=["']og:[^"']+["'])[^>]*>\s*/gi,
    ""
  );

  html = html.replace(
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi,
    ""
  );

  html = html.replace(
    /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>\s*/gi,
    ""
  );

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
  const escapedName = escapeRegExp(name);

  const tag =
    `<meta name="${escapeHTML(name)}" content="${escapeHTML(content)}">`;

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
  const escapedProperty = escapeRegExp(property);

  const tag =
    `<meta property="${escapeHTML(property)}" content="${escapeHTML(content)}">`;

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

  const regex =
    /<title\b[^>]*>[\s\S]*?<\/title>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  if (!html.includes("</head>")) {
    throw new Error("Cannot add title: </head> not found.");
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

// =====================================================
// STATIC INTERNAL NAVIGATION + H1
// =====================================================

function injectStaticContent(html, page) {
  const heading = String(page.h1 ?? "").trim();
  const subtitle = String(page.h2 ?? "").trim();

  if (!heading) {
    throw new Error(
      `Cannot add H1 for "${page.name}": heading is empty.`
    );
  }

  // Generate links to all other website pages.
  const internalLinks = PAGES
    .filter((item) => item.route !== page.route)
    .map(
      (item) =>
        `<li><a href="${item.route}">${escapeHTML(item.name)}</a></li>`
    )
    .join("\n");

  const staticContent = `
    <nav aria-label="Website navigation">
      <ul>
        ${internalLinks}
      </ul>
    </nav>

    <main>
      <h1>${escapeHTML(heading)}</h1>
      ${subtitle ? `<h2>${escapeHTML(subtitle)}</h2>` : ""}
    </main>
  `;

  const rootRegex =
    /<div\b[^>]*\bid=["']root["'][^>]*>\s*<\/div>/i;

  if (!rootRegex.test(html)) {
    throw new Error(
      'Cannot add static content: empty <div id="root"></div> not found.'
    );
  }

  return html.replace(
    rootRegex,
    `<div id="root">${staticContent}</div>`
  );
}

// =====================================================
// GOOGLE ANALYTICS
// =====================================================

function addGoogleTag(html) {
  if (html.includes(`gtag/js?id=${GOOGLE_TAG_ID}`)) {
    return html;
  }

  if (!html.includes("</head>")) {
    throw new Error(
      "Cannot add Google Analytics: </head> not found."
    );
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

  return html.replace(
    "</head>",
    `${googleTag}\n</head>`
  );
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
    </script>
  `;

  const regex =
    /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  if (!html.includes("</head>")) {
    throw new Error(
      "Cannot add Schema.org: </head> not found."
    );
  }

  return html.replace("</head>", `${tag}\n</head>`);
}

// =====================================================
// FETCH SEO DATA FROM AWS
// =====================================================

async function fetchSeoItems() {
  console.log("Fetching SEO data from AWS Lambda...");

  try {
    const response = await fetch(SEO_API, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(
        `SEO API returned HTTP ${response.status}`
      );
    }

    const result = await response.json();

    const seoItems = Array.isArray(result)
      ? result
      : Array.isArray(result?.items)
        ? result.items
        : null;

    if (!seoItems) {
      throw new Error(
        "SEO API returned an invalid data format."
      );
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
// =====================================================

async function fetchHomeHeading() {
  try {
    const response = await fetch(BANNER_API, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(
        `Banner API returned HTTP ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return {
        h1: HOME_FALLBACK_H1,
        h2: "",
      };
    }

    const latest = data[data.length - 1];

    const name = String(latest?.name ?? "").trim();
    const subtitle = String(latest?.subtitle ?? "").trim();

    return {
      h1: name || HOME_FALLBACK_H1,
      h2: subtitle,
    };
  } catch (error) {
    console.error(
      "Could not fetch home heading. Using fallback:",
      error.message
    );

    return {
      h1: HOME_FALLBACK_H1,
      h2: "",
    };
  }
}

// =====================================================
// VALIDATE CANONICAL URL
// =====================================================

function getCanonicalUrl(seo, page) {
  const fallbackCanonical =
    `${SITE_URL}${page.route}`;

  const value =
    String(seo?.canonicalUrl ?? "").trim();

  if (!value) {
    return fallbackCanonical;
  }

  try {
    const parsed = new URL(value);

    const validHost = [
      "www.steelcraftprefab.com",
      "steelcraftprefab.com",
    ].includes(parsed.hostname.toLowerCase());

    const actualPath =
      parsed.pathname.replace(/\/+$/, "") || "/";

    const expectedPath =
      page.route.replace(/\/+$/, "") || "/";

    if (
      parsed.protocol !== "https:" ||
      !validHost ||
      actualPath !== expectedPath
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
// =====================================================

function generatePageHTML(template, page, seo = {}) {
  let html = removePageSeo(template);

  const title =
    String(seo?.metaTitle ?? "").trim();

  const description =
    String(seo?.description ?? "").trim();

  const keywords =
    String(seo?.keywords ?? "").trim();

  const altText =
    String(seo?.altText ?? "").trim();

  const canonical =
    getCanonicalUrl(seo, page);

  const ogImage =
    `${SITE_URL}${OG_IMAGE_PATH}`;

  // SEO title.
  if (title) {
    html = setTitle(html, title);
    html = setMetaProperty(html, "og:title", title);
    html = setMeta(html, "twitter:title", title);
  }

  // Meta description.
  if (description) {
    html = setMeta(html, "description", description);
    html = setMetaProperty(html, "og:description", description);
    html = setMeta(html, "twitter:description", description);
  }

  // Keywords.
  if (keywords) {
    html = setMeta(html, "keywords", keywords);
  }

  // Canonical URL.
  html = setCanonical(html, canonical);

  // Open Graph tags.
  html = setMetaProperty(html, "og:type", "website");
  html = setMetaProperty(html, "og:url", canonical);
  html = setMetaProperty(
    html,
    "og:site_name",
    "Steel Craft Prefab"
  );
  html = setMetaProperty(html, "og:image", ogImage);

  // Twitter tags.
  html = setMeta(
    html,
    "twitter:card",
    "summary_large_image"
  );

  html = setMeta(html, "twitter:image", ogImage);

  // SEO alt-text attribute.
  if (altText) {
    html = html.replace(
      /<html\b([^>]*)>/i,
      (match, attributes) => {
        const cleanAttributes = attributes.replace(
          /\sdata-seo-alt-text=(["']).*?\1/gi,
          ""
        );

        return `<html${cleanAttributes} data-seo-alt-text="${escapeHTML(altText)}">`;
      }
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

  // Page schema type.
  let pageType = "WebPage";

  if (
    page.name === "Project" ||
    page.name === "Home & Cottage"
  ) {
    pageType = "CollectionPage";
  } else if (page.name === "Contact") {
    pageType = "ContactPage";
  }

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
    "@graph": [
      organization,
      website,
      pageSchema,
    ],
  });

  // Static H1 and internal links.
  html = injectStaticContent(html, page);

  // Google Analytics.
  html = addGoogleTag(html);

  return html;
}

// =====================================================
// MAIN
// =====================================================

async function main() {
  const templatePath =
    path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      "dist/index.html was not found. Run the Vite build first."
    );
  }

  const template =
    fs.readFileSync(templatePath, "utf8");

  if (!template.includes("</head>")) {
    throw new Error(
      "Closing </head> tag not found."
    );
  }

  // Check Open Graph image.
  if (
    !fs.existsSync(
      path.join(DIST_DIR, OG_IMAGE_PATH)
    )
  ) {
    throw new Error(
      `OG image not found at dist${OG_IMAGE_PATH}. Put it in public/og/ and rebuild.`
    );
  }

  const [seoItems, homeHeading] =
    await Promise.all([
      fetchSeoItems(),
      fetchHomeHeading(),
    ]);

  // Update Home page heading.
  const homePage =
    PAGES.find((page) => page.route === "/");

  if (homePage) {
    homePage.h1 = homeHeading.h1;
    homePage.h2 = homeHeading.h2;
  }

  let generatedCount = 0;
  let failedCount = 0;

  // Generate all pages.
  for (const page of PAGES) {
    const seo =
      seoItems.find(
        (item) =>
          normalizePage(item?.page) ===
          normalizePage(page.name)
      ) || {};

    try {
      const html =
        generatePageHTML(template, page, seo);

      const outputPath =
        path.join(DIST_DIR, page.output);

      fs.mkdirSync(
        path.dirname(outputPath),
        {
          recursive: true,
        }
      );

      fs.writeFileSync(
        outputPath,
        html,
        "utf8"
      );

      const hasSavedSeo =
        Boolean(
          String(seo.metaTitle ?? "").trim()
        ) ||
        Boolean(
          String(seo.description ?? "").trim()
        );

      console.log(
        `GENERATED: ${page.name} — ${
          hasSavedSeo
            ? "Saved SEO fields + schema + internal links"
            : "Schema + internal links generated without saved SEO"
        }`
      );

      console.log(`File: ${page.output}`);
      console.log(`H1: ${page.h1}`);

      if (page.h2) {
        console.log(`H2: ${page.h2}`);
      }

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

  if (
    failedCount > 0 ||
    generatedCount !== PAGES.length
  ) {
    throw new Error(
      "Some page HTML files failed to generate."
    );
  }
}

// =====================================================
// RUN
// =====================================================

main().catch((error) => {
  console.error(
    "SEO HTML generation failed:",
    error.message
  );

  process.exitCode = 1;
});