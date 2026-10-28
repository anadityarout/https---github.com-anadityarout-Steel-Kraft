
import fs from "node:fs";
import path from "node:path";

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const DIST_DIR = path.resolve("dist");
const SITE_URL = "https://www.steelcraftprefab.com";
const GOOGLE_TAG_ID = "G-MK6E9HDEHC";

// These routes must match App.jsx exactly.
const PAGES = [
  {
    name: "Home",
    route: "/",
    output: "index.html",
  },
  {
    name: "Project",
    route: "/projects",
    output: "projects/index.html",
  },
  {
    name: "Home & Cottage",
    route: "/homes-cottages",
    output: "homes-cottages/index.html",
  },
  {
    name: "One BHK",
    route: "/work/1bhk",
    output: "work/1bhk/index.html",
  },
  {
    name: "Two BHK",
    route: "/work/2bhk",
    output: "work/2bhk/index.html",
  },
  {
    name: "Three BHK",
    route: "/work/3bhk",
    output: "work/3bhk/index.html",
  },
  {
    name: "Four BHK",
    route: "/work/4bhk",
    output: "work/4bhk/index.html",
  },
  {
    name: "Contact",
    route: "/contact",
    output: "contact/index.html",
  },
];

// =====================================================
// HTML ESCAPING
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

// =====================================================
// SET OR INSERT META TAG
// =====================================================

function setMeta(html, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const tag = `<meta name="${name}" content="${escapeHTML(content)}">`;

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

// =====================================================
// SET OR INSERT PROPERTY META TAG
// =====================================================

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

// =====================================================
// SET OR INSERT CANONICAL URL
// =====================================================

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHTML(url)}">`;

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

// =====================================================
// SET OR INSERT PAGE TITLE
// =====================================================

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
// GOOGLE ANALYTICS
// =====================================================

function addGoogleTag(html) {
  // Remove existing gtag.js loaders and inline Google tag blocks.
  // Then insert exactly one configuration for this measurement ID.
  html = html.replace(
    /<script\b(?=[^>]*\bsrc=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"']+["'])[^>]*>\s*<\/script>/gi,
    ""
  );

  html = html.replace(
    /<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>/gi,
    ""
  );

  // Remove an existing inline gtag configuration to avoid duplicates.
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
// FETCH SEO DATA FROM AWS LAMBDA
// =====================================================

async function fetchSeoItems() {
  console.log("Fetching SEO data from AWS Lambda...");

  const response = await fetch(SEO_API, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`SEO API returned HTTP ${response.status}`);
  }

  const result = await response.json();

  // Support a direct array or an object containing items.
  const seoItems = Array.isArray(result)
    ? result
    : Array.isArray(result?.items)
      ? result.items
      : null;

  if (!seoItems) {
    throw new Error("SEO API returned an invalid data format.");
  }

  console.log(
    "Page names returned by API:",
    seoItems.map((item) => item?.page)
  );

  return seoItems;
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
// GENERATE PAGE HTML
// =====================================================

function generatePageHTML(template, page, seo) {
  let html = template;

  const title = String(seo?.metaTitle ?? "").trim();
  const description = String(seo?.description ?? "").trim();
  const keywords = String(seo?.keywords ?? "").trim();
  const altText = String(seo?.altText ?? "").trim();

  if (!title) {
    throw new Error(
      `SEO title is missing for "${page.name}". Add it in SEO Admin.`
    );
  }

  if (!description) {
    throw new Error(
      `SEO description is missing for "${page.name}". Add it in SEO Admin.`
    );
  }

  const canonical = getCanonicalUrl(seo, page);
  const ogImage = `${SITE_URL}/assets/steel-craft-og-image.jpg`;

  // Standard SEO metadata.
  html = setTitle(html, title);
  html = setMeta(html, "description", description);
  html = setMeta(html, "keywords", keywords);
  html = setCanonical(html, canonical);

  // Store the Admin Dashboard alt text on the HTML element.
  // This does not automatically change individual React image alt attributes.
  if (/<html\b[^>]*>/i.test(html)) {
    if (/data-seo-alt-text=["'][^"']*["']/i.test(html)) {
      html = html.replace(
        /data-seo-alt-text=["'][^"']*["']/i,
        `data-seo-alt-text="${escapeHTML(altText)}"`
      );
    } else {
      html = html.replace(
        /<html\b([^>]*)>/i,
        `<html$1 data-seo-alt-text="${escapeHTML(altText)}">`
      );
    }
  }

  // Open Graph metadata.
  html = setMetaProperty(html, "og:title", title);
  html = setMetaProperty(html, "og:description", description);
  html = setMetaProperty(html, "og:type", "website");
  html = setMetaProperty(html, "og:url", canonical);
  html = setMetaProperty(html, "og:site_name", "Steel Craft Prefab");
  html = setMetaProperty(html, "og:image", ogImage);

  // Twitter metadata.
  html = setMeta(html, "twitter:card", "summary_large_image");
  html = setMeta(html, "twitter:title", title);
  html = setMeta(html, "twitter:description", description);
  html = setMeta(html, "twitter:image", ogImage);

  // Organization and website schema.
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Steel Craft Prefab",
    url: `${SITE_URL}/`,
  };

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

  const pageSchema = {
    "@type": pageType,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };

  html = setSchema(html, {
    "@context": "https://schema.org",
    "@graph": [organization, website, pageSchema],
  });

  // Google Analytics.
  html = addGoogleTag(html);

  return html;
}

// =====================================================
// MAIN
// =====================================================

async function main() {
  const templatePath = path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      "dist/index.html was not found. Run npm run build first."
    );
  }

  const template = fs.readFileSync(templatePath, "utf8");

  if (!template.includes("</head>")) {
    throw new Error(
      "The closing </head> tag was not found in dist/index.html."
    );
  }

  const seoItems = await fetchSeoItems();

  for (const page of PAGES) {
    const seo = seoItems.find(
      (item) =>
        String(item?.page ?? "").trim().toLowerCase() ===
        page.name.trim().toLowerCase()
    );

    if (!seo) {
      throw new Error(
        `SEO record not found for "${page.name}". ` +
        "Check the page name in the SEO Admin Dashboard."
      );
    }

    const html = generatePageHTML(template, page, seo);
    const outputPath = path.join(DIST_DIR, page.output);

    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true,
    });

    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`Generated: ${page.output}`);
    console.log(`SEO page: ${page.name}`);
    console.log(`SEO title: ${seo.metaTitle}`);
    console.log(`Canonical: ${getCanonicalUrl(seo, page)}`);
  }

  console.log("All SEO HTML pages generated successfully.");
}

main().catch((error) => {
  console.error("SEO HTML generation failed:", error.message);
  process.exitCode = 1;
});
