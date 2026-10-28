import fs from "node:fs";
import path from "node:path";

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const DIST_DIR = path.resolve("dist");
const SITE_URL = "https://www.steelcraftprefab.com";
const GOOGLE_TAG_ID = "G-MK6E9HDEHC";

// Make sure these routes match your React Router paths.
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
    route: "/onebhk",
    output: "onebhk/index.html",
  },
  {
    name: "Two BHK",
    route: "/twobhk",
    output: "twobhk/index.html",
  },
  {
    name: "Three BHK",
    route: "/threebhk",
    output: "threebhk/index.html",
  },
  {
    name: "Four BHK",
    route: "/fourbhk",
    output: "fourbhk/index.html",
  },
  {
    name: "Contact",
    route: "/contact",
    output: "contact/index.html",
  },
];


/* =========================================================
   HTML ESCAPING
========================================================= */

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


/* =========================================================
   UPDATE OR INSERT META TAG
========================================================= */

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


/* =========================================================
   UPDATE OR INSERT PROPERTY META TAG
========================================================= */

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


/* =========================================================
   UPDATE OR INSERT CANONICAL URL
========================================================= */

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


/* =========================================================
   UPDATE OR INSERT PAGE TITLE
========================================================= */

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


/* =========================================================
   GOOGLE ANALYTICS
========================================================= */

function addGoogleTag(html) {
  const loaderPattern =
    /<script\b[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"']+["'][^>]*>\s*<\/script>/i;

  const configPattern = new RegExp(
    `gtag\\(\\s*['"]config['"]\\s*,\\s*['"]${GOOGLE_TAG_ID}['"]\\s*\\)`
  );

  const loaderExists = loaderPattern.test(html);
  const configExists = configPattern.test(html);

  // Correct loader and configuration are already present.
  if (loaderExists && configExists) {
    return html;
  }

  // Loader exists, but our measurement ID is not configured.
  if (loaderExists && !configExists) {
    const configScript = `
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_TAG_ID}');
    </script>`;

    return html.replace("</head>", `${configScript}\n</head>`);
  }

  // Remove a previously generated Google Analytics block
  // before installing the correct measurement ID.
  html = html.replace(
    /<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>\s*<\/script>/i,
    ""
  );

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

  if (!html.includes("</head>")) {
    throw new Error("Cannot add Google Analytics: </head> not found.");
  }

  return html.replace("</head>", `${googleTag}\n</head>`);
}


/* =========================================================
   SCHEMA.ORG
========================================================= */

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


/* =========================================================
   FETCH SEO DATA
========================================================= */

async function fetchSeoItems() {
  console.log("Fetching SEO data from AWS Lambda...");

  const response = await fetch(SEO_API, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`SEO API returned HTTP ${response.status}`);
  }

  const result = await response.json();

  // Supports either a direct array or { items: [...] }.
  const seoItems = Array.isArray(result)
    ? result
    : Array.isArray(result?.items)
      ? result.items
      : null;

  if (!seoItems) {
    throw new Error("SEO API returned an invalid data format.");
  }

  return seoItems;
}


/* =========================================================
   GENERATE PAGE HTML
========================================================= */

function generatePageHTML(template, page, seo) {
  let html = template;

  // SEO fields are sourced from the Admin Dashboard.
  const title = String(seo?.metaTitle ?? "").trim();
  const description = String(seo?.description ?? "").trim();
  const keywords = String(seo?.keywords ?? "").trim();
  const altText = String(seo?.altText ?? "").trim();

  if (!seo) {
    console.warn(
      `Warning: No SEO record found for "${page.name}".`
    );
  }

  if (!title) {
    console.warn(
      `Warning: SEO title is empty for "${page.name}".`
    );
  }

  if (!description) {
    console.warn(
      `Warning: SEO description is empty for "${page.name}".`
    );
  }

  // Prefer the canonical URL saved in the Admin Dashboard.
  // Otherwise use the route's canonical URL.
  const fallbackCanonical =
    `${SITE_URL}${page.route === "/" ? "/" : page.route}`;

  let canonical = String(seo?.canonicalUrl ?? "").trim();

  // Accept only HTTPS URLs belonging to this website.
  try {
    const parsedCanonical = new URL(canonical);

    const validHost = [
      "www.steelcraftprefab.com",
      "steelcraftprefab.com",
    ].includes(parsedCanonical.hostname.toLowerCase());

    if (
      parsedCanonical.protocol !== "https:" ||
      !validHost
    ) {
      canonical = fallbackCanonical;
    }
  } catch {
    canonical = fallbackCanonical;
  }

  // Apply standard SEO metadata.
  html = setTitle(html, title);
  html = setMeta(html, "description", description);
  html = setMeta(html, "keywords", keywords);
  html = setCanonical(html, canonical);

  // Expose the saved alt-text setting in the HTML.
  // React image alt attributes must still be updated in React
  // if you want this value to change individual image alt text.
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

  // Replace this with your actual public social-sharing image URL.
  const ogImage = `${SITE_URL}/assets/steel-craft-og-image.jpg`;

  html = setMetaProperty(html, "og:image", ogImage);

  // Twitter metadata.
  html = setMeta(html, "twitter:card", "summary_large_image");
  html = setMeta(html, "twitter:title", title);
  html = setMeta(html, "twitter:description", description);
  html = setMeta(html, "twitter:image", ogImage);

  // Shared Schema.org entities.
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
    "@graph": [
      organization,
      website,
      pageSchema,
    ],
  });

  // Keep Google Analytics in every generated page.
  html = addGoogleTag(html);

  return html;
}


/* =========================================================
   MAIN
========================================================= */

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
        page.name.toLowerCase()
    );

    const html = generatePageHTML(template, page, seo);
    const outputPath = path.join(DIST_DIR, page.output);

    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true,
    });

    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`Generated: ${page.output}`);
    console.log(`SEO record: ${seo ? "Found" : "Missing"}`);
    console.log(`Google Analytics: ${GOOGLE_TAG_ID}`);
  }

  console.log("SEO HTML generation completed.");
}

main().catch((error) => {
  console.error("SEO HTML generation failed:", error);
  process.exitCode = 1;
});