
import fs from "node:fs";
import path from "node:path";

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const DIST_DIR = path.resolve("dist");

// Replace this with your actual production website URL.
const SITE_URL = "https://www.steelcraftprefab.com";

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

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHTML(url)}">`;

  const regex =
    /<link\s+[^>]*rel=["']canonical["'][^>]*\/?>/i;

  if (regex.test(html)) {
    return html.replace(regex, tag);
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

function setTitle(html, title) {
  const tag = `<title>${escapeHTML(title)}</title>`;

  if (/<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/i,
      tag
    );
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
}

async function main() {
  const templatePath = path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      "dist/index.html was not found. Run npm run build first."
    );
  }

  const template = fs.readFileSync(templatePath, "utf8");

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

    let html = template;

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

    const outputPath = path.join(DIST_DIR, page.output);

    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true,
    });

    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`Generated SEO HTML: ${page.output}`);
  }

  console.log("SEO HTML generation completed.");
}

main().catch((error) => {
  console.error("SEO HTML generation failed:", error);
  process.exitCode = 1;
});
