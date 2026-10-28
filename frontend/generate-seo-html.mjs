
import fs from "node:fs";
import path from "node:path";

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const DIST_DIR = path.resolve("dist");

const SITE_URL = "https://www.steelcraftprefab.com";

const GOOGLE_TAG_ID = "G-MK6E9HDEHC";

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
    name: "Contact",
    route: "/contact",
    output: "contact/index.html",
  },
];

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

// Add or update a meta tag.
function setMeta(html, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const tag = `<meta name="${name}" content="${escapeHTML(content)}">`;

  const regex = new RegExp(
    `<meta\\s+[^>]*name=["']${escapedName}["'][^>]*\\/?>`,
    "i"
  );

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

// Add or update the canonical URL.
function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHTML(url)}">`;

  const regex =
    /<link\s+[^>]*rel=["']canonical["'][^>]*\/?>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

// Add or update the page title.
function setTitle(html, title) {
  const tag = `<title>${escapeHTML(title)}</title>`;

  const regex = /<title\b[^>]*>[\s\S]*?<\/title>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

// Add Google Analytics to the HTML source.
function addGoogleTag(html) {
  // Prevent duplicate installation of the same Google tag.
  const googleScriptRegex =
    /<script\b[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=([^"'&]+)[^"']*["'][^>]*>\s*<\/script>/i;

  if (googleScriptRegex.test(html)) {
    // Ensure the correct measurement ID is configured.
    const configRegex = new RegExp(
      `gtag\\(\\s*['"]config['"]\\s*,\\s*['"]${GOOGLE_TAG_ID}['"]\\s*\\)`
    );

    if (configRegex.test(html)) {
      return html;
    }

    // If the loader exists but the configuration does not,
    // add the configuration without adding another loader.
    const configScript = `
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_TAG_ID}');
    </script>`;

    return html.replace("</head>", `${configScript}\n</head>`);
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

  if (!html.includes("</head>")) {
    throw new Error("Cannot add Google tag: closing </head> was not found.");
  }

  return html.replace("</head>", `${googleTag}\n</head>`);
}

async function main() {
  const templatePath = path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      "dist/index.html was not found. Run npm run build first."
    );
  }

  // Read the built HTML template.
  const template = fs.readFileSync(templatePath, "utf8");

  if (!template.includes("</head>")) {
    throw new Error(
      "The closing </head> tag was not found in dist/index.html."
    );
  }

  console.log("Fetching SEO data from AWS...");

  const response = await fetch(SEO_API);

  if (!response.ok) {
    throw new Error(`SEO API returned HTTP ${response.status}`);
  }

  const result = await response.json();

  const seoItems = Array.isArray(result)
    ? result
    : Array.isArray(result.items)
      ? result.items
      : null;

  if (!seoItems) {
    throw new Error("SEO API returned an invalid data format.");
  }

  for (const page of PAGES) {
    const seo = seoItems.find(
      (item) =>
        item.page?.toLowerCase() === page.name.toLowerCase()
    );

    // Start from the built template for each page.
    let html = template;

    // Add the Google tag before writing the HTML.
    html = addGoogleTag(html);

    // Apply page-specific SEO information.
    const title = seo?.metaTitle?.trim() || "Steel Craft";
    const description = seo?.description?.trim() || "";

    html = setTitle(html, title);

    html = setMeta(
      html,
      "description",
      description
    );

    html = setMeta(
      html,
      "keywords",
      seo?.keywords?.trim() || ""
    );

    const canonical =
      seo?.canonicalUrl?.trim() ||
      `${SITE_URL}${page.route === "/" ? "/" : page.route}`;

    html = setCanonical(html, canonical);

    // Create the destination directory if needed.
    const outputPath = path.join(DIST_DIR, page.output);

    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true,
    });

    // Write the generated HTML to the dist folder.
    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`Generated SEO HTML: ${page.output}`);
    console.log(`Google tag included: ${GOOGLE_TAG_ID}`);
  }

  console.log("SEO HTML generation completed successfully.");
}

main().catch((error) => {
  console.error("SEO HTML generation failed:", error);
  process.exitCode = 1;
});
