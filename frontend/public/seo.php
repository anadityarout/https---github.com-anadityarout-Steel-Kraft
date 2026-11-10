<?php

// =========================================================
// STEEL CRAFT PREFAB
// Dynamic SEO from Admin Dashboard
// AWS Lambda + Open Graph + Twitter + Schema.org
// Static H1 + Static Internal Links + Dynamic Sitemap
// =========================================================


// =========================================================
// CONFIGURATION
// =========================================================

$apiUrl = 'https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo';

$bannerApiUrl = 'https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/homebanner';

// ONE host for everything: canonicals, Open Graph, schema and sitemap.
// Your server redirects www -> non-www, so non-www is used here.
// Keep robots.txt "Sitemap:" and Search Console on this same host.
$siteUrl = 'https://steelcraftprefab.com';

$ogImage = $siteUrl . '/og/steel-craft-prefab-og.jpg';

$googleTagId = 'G-MK6E9HDEHC';

// Seconds the Lambda responses are cached on the server.
$cacheTtl = 300;


// =========================================================
// ALL WEBSITE ROUTES
//
// "title" and "description" are FALLBACKS used only when the
// Admin Dashboard has no saved value for that page, so a page
// never ships without a <title> or meta description.
// =========================================================

$routes = [

    '/' => [
        'page' => 'Home',
        'canonical' => $siteUrl . '/',
        'h1' => 'Premium Prefab Homes, Modular Villas & Resort Cottages',
        'title' => 'Steel Craft Prefab | Prefab Homes, Modular Villas & Resort Cottages',
        'description' => 'Steel Craft Prefab builds prefabricated steel homes, modular villas and resort cottages with fast construction and durable quality.',
    ],

    '/about' => [
        'page' => 'About',
        'canonical' => $siteUrl . '/about',
        'h1' => 'About Steel Kraft Prefab',
        'title' => 'About Us | Steel Craft Prefab',
        'description' => 'Learn about Steel Craft Prefab, our team and how we build prefab homes, modular villas and resort cottages.',
    ],

    '/projects' => [
        'page' => 'Project',
        'canonical' => $siteUrl . '/projects',
        'h1' => 'Our Prefab Home & Villa Projects',
        'title' => 'Our Projects | Steel Craft Prefab',
        'description' => 'Explore completed prefab homes, modular villas and resort cottages built by Steel Craft Prefab.',
    ],

    '/homes-cottages' => [
        'page' => 'Home & Cottage',
        'canonical' => $siteUrl . '/homes-cottages',
        'h1' => 'Prefab Homes & Resort Cottages',
        'title' => 'Prefab Homes & Cottages | Steel Craft Prefab',
        'description' => 'Browse prefab homes and cottages designed and built by Steel Craft Prefab.',
    ],

    '/work/1bhk' => [
        'page' => 'One BHK',
        'canonical' => $siteUrl . '/work/1bhk',
        'h1' => '1 BHK Prefab Home Designs',
        'title' => '1 BHK Prefab Home | Steel Craft Prefab',
        'description' => 'See our 1 BHK prefab home designs by Steel Craft Prefab.',
    ],

    '/work/2bhk' => [
        'page' => 'Two BHK',
        'canonical' => $siteUrl . '/work/2bhk',
        'h1' => '2 BHK Prefab Home Designs',
        'title' => '2 BHK Prefab Home | Steel Craft Prefab',
        'description' => 'See our 2 BHK prefab home designs by Steel Craft Prefab.',
    ],

    '/work/3bhk' => [
        'page' => 'Three BHK',
        'canonical' => $siteUrl . '/work/3bhk',
        'h1' => '3 BHK Prefab Home Designs',
        'title' => '3 BHK Prefab Home | Steel Craft Prefab',
        'description' => 'See our 3 BHK prefab home designs by Steel Craft Prefab.',
    ],

    '/work/4bhk' => [
        'page' => 'Four BHK',
        'canonical' => $siteUrl . '/work/4bhk',
        'h1' => '4 BHK Prefab Home Designs',
        'title' => '4 BHK Prefab Home | Steel Craft Prefab',
        'description' => 'See our 4 BHK prefab home designs by Steel Craft Prefab.',
    ],

    '/contact' => [
        'page' => 'Contact',
        'canonical' => $siteUrl . '/contact',
        'h1' => 'Contact Steel Craft Prefab',
        'title' => 'Contact Us | Steel Craft Prefab',
        'description' => 'Get in touch with Steel Craft Prefab for prefab homes, modular villas and resort cottages.',
    ],

];


// =========================================================
// HELPER FUNCTIONS
// =========================================================

function seoEscape($value)
{
    return htmlspecialchars(
        (string) $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}


function normalizeSeoPage($value)
{
    return strtolower(
        preg_replace('/\s+/', ' ', trim((string) $value))
    );
}


// Works on PHP versions older than 8.1 (no array_is_list).
function seoIsList($array)
{
    if (!is_array($array)) {
        return false;
    }

    if ($array === []) {
        return true;
    }

    return array_keys($array) === range(0, count($array) - 1);
}


// =========================================================
// REPLACE OR INSERT HEAD TAG
// =========================================================

function replaceHeadTag(&$html, $pattern, $replacement)
{
    if (preg_match($pattern, $html)) {

        $html = preg_replace(
            $pattern,
            $replacement,
            $html,
            1
        );

    } else {

        $html = preg_replace(
            '~</head>~i',
            $replacement . "\n</head>",
            $html,
            1
        );

    }
}


// =========================================================
// TITLE
// =========================================================

function setPageTitle(&$html, $title)
{
    $tag = '<title>' . seoEscape($title) . '</title>';

    replaceHeadTag(
        $html,
        '~<title\b[^>]*>.*?</title>~is',
        $tag
    );
}


// =========================================================
// META NAME
// =========================================================

function setMetaName(&$html, $name, $content)
{
    $safeName = preg_quote($name, '~');

    $pattern = "~<meta\\b(?=[^>]*\\bname=[\"']"
        . $safeName
        . "[\"'])[^>]*>~i";

    $tag = '<meta name="' . seoEscape($name)
        . '" content="' . seoEscape($content) . '">';

    replaceHeadTag($html, $pattern, $tag);
}


// =========================================================
// META PROPERTY
// =========================================================

function setMetaProperty(&$html, $property, $content)
{
    $safeProperty = preg_quote($property, '~');

    $pattern = "~<meta\\b(?=[^>]*\\bproperty=[\"']"
        . $safeProperty
        . "[\"'])[^>]*>~i";

    $tag = '<meta property="' . seoEscape($property)
        . '" content="' . seoEscape($content) . '">';

    replaceHeadTag($html, $pattern, $tag);
}


// =========================================================
// CANONICAL URL
// =========================================================

function setCanonical(&$html, $url)
{
    $pattern =
        '~<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>~i';

    $tag = '<link rel="canonical" href="'
        . seoEscape($url) . '">';

    replaceHeadTag($html, $pattern, $tag);
}


// =========================================================
// REMOVE EXISTING PAGE SEO
// =========================================================

function removePageSeo(&$html)
{
    // Remove existing title.
    $html = preg_replace(
        '~<title\b[^>]*>.*?</title>\s*~is',
        '',
        $html
    );

    // Remove description, keywords and Twitter metadata.
    $html = preg_replace(
        '~<meta\b(?=[^>]*\bname=["\'](?:description|keywords|twitter:[^"\']+)["\'])[^>]*>\s*~i',
        '',
        $html
    );

    // Remove Open Graph metadata.
    $html = preg_replace(
        '~<meta\b(?=[^>]*\bproperty=["\']og:[^"\']+["\'])[^>]*>\s*~i',
        '',
        $html
    );

    // Remove canonical link.
    $html = preg_replace(
        '~<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>\s*~i',
        '',
        $html
    );

    // Remove existing JSON-LD.
    $html = preg_replace(
        '~<script\b(?=[^>]*\btype=["\']application/ld\+json["\'])[^>]*>.*?</script>\s*~is',
        '',
        $html
    );

    // Remove old SEO alt-text attribute.
    $html = preg_replace(
        '~\sdata-seo-alt-text=(["\']).*?\1~i',
        '',
        $html
    );
}


// =========================================================
// CLEAN LEFTOVER STATIC CONTENT
// If an older build (generate-seo-html.mjs) put the Home
// heading or links inside the template, remove them so they
// are never copied to other pages.
// =========================================================

function removeStaticLeftovers(&$html)
{
    $html = preg_replace(
        '~<nav\b[^>]*aria-label=["\']Website navigation["\'][^>]*>.*?</nav>\s*~is',
        '',
        $html
    );

    $html = preg_replace(
        '~<main>\s*<h1\b[^>]*>.*?</main>\s*~is',
        '',
        $html
    );

    $html = preg_replace(
        '~<h1\b[^>]*style=["\']position:absolute[^>]*>.*?</h1>\s*(?:<h2\b[^>]*style=["\']position:absolute[^>]*>.*?</h2>\s*)?~is',
        '',
        $html
    );

    $html = preg_replace(
        '~<div\b[^>]*style=["\']position:absolute;width:1px[^>]*>\s*</div>\s*~is',
        '',
        $html
    );
}


// =========================================================
// SCHEMA.ORG
// =========================================================

function setSchema(&$html, $schema)
{
    $json = json_encode(
        $schema,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE |
        JSON_HEX_TAG |
        JSON_HEX_AMP |
        JSON_HEX_APOS |
        JSON_HEX_QUOT
    );

    if ($json === false) {

        error_log(
            'SEO schema encoding failed: ' . json_last_error_msg()
        );

        return;
    }

    $tag = '<script type="application/ld+json">'
        . "\n" . $json . "\n"
        . '</script>';

    $pattern =
        '~<script\b(?=[^>]*\btype=["\']application/ld\+json["\'])[^>]*>.*?</script>~is';

    replaceHeadTag($html, $pattern, $tag);
}


// =========================================================
// GOOGLE ANALYTICS
// Added only when it is not already in the HTML.
// =========================================================

function addGoogleTag(&$html, $tagId)
{
    if (stripos($html, 'gtag/js?id=' . $tagId) !== false) {
        return;
    }

    $googleTag = '
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=' . $tagId . '"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag(\'js\', new Date());
      gtag(\'config\', \'' . $tagId . '\');
    </script>';

    $html = preg_replace(
        '~</head>~i',
        $googleTag . "\n</head>",
        $html,
        1
    );
}


// =========================================================
// STATIC H1 INSIDE THE REACT ROOT
// Crawlers that do not run JavaScript still see one H1.
// It is visually hidden so visitors never see a flash, and
// React replaces it when the app loads.
// =========================================================

function injectRootHeading(&$html, $heading, $subtitle = '')
{
    $heading = trim((string) $heading);
    $subtitle = trim((string) $subtitle);

    if ($heading === '') {
        return;
    }

    $pattern =
        '~<div\b[^>]*\bid=["\']root["\'][^>]*>\s*</div>~i';

    if (!preg_match($pattern, $html)) {

        error_log(
            'SEO: empty <div id="root"></div> not found. H1 was not inserted.'
        );

        return;
    }

    $style = 'position:absolute;width:1px;height:1px;'
        . 'overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap';

    $inner = '<h1 style="' . $style . '">'
        . seoEscape($heading) . '</h1>';

    if ($subtitle !== '') {
        $inner .= '<h2 style="' . $style . '">'
            . seoEscape($subtitle) . '</h2>';
    }

    $html = preg_replace_callback(
        $pattern,
        function ($match) use ($inner) {
            return preg_replace(
                '~</div>\s*$~i',
                $inner . '</div>',
                $match[0]
            );
        },
        $html,
        1
    );
}


// =========================================================
// STATIC INTERNAL NAVIGATION
// INSERTED OUTSIDE REACT ROOT
// =========================================================

function addStaticInternalLinks(&$html, $currentPath, $routes)
{
    $links = '';

    foreach ($routes as $route => $data) {

        // Do not link to the current page.
        if ($route === $currentPath) {
            continue;
        }

        $links .= '<li style="margin:8px 0;">'
            . '<a href="' . seoEscape($route) . '">'
            . seoEscape($data['page'])
            . '</a>'
            . '</li>';
    }

    $navigation = '
        <section aria-label="Explore more pages"
            style="padding:20px; text-align:center;">

            <p style="font-size:1.5em; font-weight:700; margin:0 0 12px;">Explore More Pages</p>

            <nav aria-label="Website internal links">

                <ul style="list-style:none; padding:0; margin:0;">
                    ' . $links . '
                </ul>

            </nav>

        </section>
    ';

    // Insert links before the closing body tag.
    // This keeps them outside the React #root element.

    if (stripos($html, '</body>') !== false) {

        $html = str_ireplace(
            '</body>',
            $navigation . "\n</body>",
            $html
        );

    } else {

        error_log(
            'SEO: Body closing tag was not found. Internal links were not inserted.'
        );

    }
}


// =========================================================
// SEND HTML
// =========================================================

function sendHtml($html, $statusCode = 200, $extraHeaders = [])
{
    http_response_code($statusCode);

    header('Content-Type: text/html; charset=UTF-8');

    header(
        'Cache-Control: no-store, no-cache, must-revalidate, max-age=0'
    );

    header('Pragma: no-cache');

    foreach ($extraHeaders as $header) {
        header($header);
    }

    echo $html;

    exit;
}


// =========================================================
// FETCH JSON FROM AWS (CACHED)
// A slow or failing API never slows down Googlebot. If the
// API fails, the last good cached copy is used.
// =========================================================

function fetchJsonCached($url, $cacheName, $ttl)
{
    $cacheFile = sys_get_temp_dir()
        . '/steelcraft_' . $cacheName . '.json';

    $readCache = function () use ($cacheFile) {

        if (!is_file($cacheFile)) {
            return null;
        }

        $raw = @file_get_contents($cacheFile);

        $data = $raw === false
            ? null
            : json_decode($raw, true);

        return is_array($data) ? $data : null;
    };

    // 1) Fresh cache.
    if (
        is_file($cacheFile) &&
        (time() - (int) filemtime($cacheFile)) < $ttl
    ) {

        $cached = $readCache();

        if ($cached !== null) {
            return $cached;
        }
    }

    // 2) Call the API.
    $context = stream_context_create([

        'http' => [
            'method' => 'GET',
            'timeout' => 4,
            'ignore_errors' => true,
            'header' => "Accept: application/json\r\n",
        ],

    ]);

    $response = @file_get_contents($url, false, $context);

    $status = 0;

    if (
        isset($http_response_header[0]) &&
        preg_match('~\s(\d{3})\s~', $http_response_header[0], $m)
    ) {
        $status = (int) $m[1];
    }

    if ($response !== false && $status >= 200 && $status < 300) {

        $decoded = json_decode($response, true);

        if (is_array($decoded)) {

            @file_put_contents(
                $cacheFile,
                json_encode($decoded),
                LOCK_EX
            );

            return $decoded;
        }

        error_log('SEO: invalid JSON from ' . $url);

    } else {

        error_log(
            'SEO: API request failed (' . $status . ') for ' . $url
        );

    }

    // 3) API failed: use the stale cache if there is one.
    return $readCache();
}


// =========================================================
// GET REQUESTED ROUTE
// =========================================================

$path = parse_url(
    $_SERVER['REQUEST_URI'] ?? '/',
    PHP_URL_PATH
) ?: '/';

$path = '/' . trim($path, '/');

if ($path !== '/') {
    $path = rtrim($path, '/');
}


// =========================================================
// DYNAMIC SITEMAP
// Built from the routes above, so it always uses the same
// host as the canonicals and never goes out of date.
// Delete any static public/sitemap.xml so this is used.
// =========================================================

if ($path === '/sitemap.xml') {

    $lastmod = date(
        'Y-m-d',
        @filemtime(__DIR__ . '/index.html') ?: time()
    );

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
        . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    foreach ($routes as $data) {

        $xml .= "  <url>\n"
            . '    <loc>' . seoEscape($data['canonical']) . "</loc>\n"
            . '    <lastmod>' . $lastmod . "</lastmod>\n"
            . "  </url>\n";
    }

    $xml .= '</urlset>' . "\n";

    http_response_code(200);
    header('Content-Type: application/xml; charset=UTF-8');
    header('Cache-Control: public, max-age=3600');
    echo $xml;
    exit;
}


// =========================================================
// robots.txt MUST NEVER RETURN HTML
// =========================================================

if ($path === '/robots.txt') {

    $robotsFile = __DIR__ . '/robots.txt';

    if (is_file($robotsFile)) {

        http_response_code(200);
        header('Content-Type: text/plain; charset=UTF-8');
        header('Cache-Control: public, max-age=3600');
        readfile($robotsFile);
        exit;
    }

    http_response_code(404);
    header('Content-Type: text/plain; charset=UTF-8');
    exit('Not found.');
}


// =========================================================
// LOAD REACT HTML TEMPLATE
// =========================================================

$htmlFile = __DIR__ . '/index.html';

if (!is_file($htmlFile)) {

    error_log(
        'SEO: index.html was not found at ' . $htmlFile
    );

    http_response_code(500);

    exit('Website HTML not found.');
}


$html = file_get_contents($htmlFile);

if ($html === false || stripos($html, '</head>') === false) {

    error_log('SEO: Could not read valid index.html.');

    http_response_code(500);

    exit('Unable to load website HTML.');
}


// =========================================================
// UNKNOWN ROUTE
// Admin pages stay 200 but are marked noindex.
// Any other unknown URL returns a real 404 status so Google
// does not index it as a duplicate (soft 404).
// =========================================================

if (!isset($routes[$path])) {

    removePageSeo($html);
    removeStaticLeftovers($html);

    if ($path === '/admin' || strpos($path, '/admin/') === 0) {
        sendHtml($html, 200, ['X-Robots-Tag: noindex, nofollow']);
    }

    sendHtml($html, 404, ['X-Robots-Tag: noindex']);
}


$route = $routes[$path];


// =========================================================
// FETCH SEO DATA FROM AWS LAMBDA (CACHED)
// =========================================================

$seoData = fetchJsonCached($apiUrl, 'seo', $cacheTtl);

$items = [];

if (is_array($seoData)) {

    if (isset($seoData['items']) && is_array($seoData['items'])) {

        $items = $seoData['items'];

    } elseif (seoIsList($seoData)) {

        $items = $seoData;

    } else {

        error_log('SEO: AWS API returned an unexpected format.');

    }
}


// =========================================================
// MATCH REQUESTED PAGE
// =========================================================

$seoItem = null;

$expectedPage = normalizeSeoPage($route['page']);

foreach ($items as $item) {

    if (!is_array($item)) {
        continue;
    }

    if (
        normalizeSeoPage($item['page'] ?? '') === $expectedPage
    ) {

        $seoItem = $item;

        break;
    }

}


// Missing SEO record is allowed.
$seoItem = is_array($seoItem) ? $seoItem : [];


// Remove metadata and old static content inherited from the template.
removePageSeo($html);
removeStaticLeftovers($html);


// =========================================================
// READ ADMIN DASHBOARD SEO DATA (with route fallbacks)
// =========================================================

$title = trim(
    (string) ($seoItem['metaTitle'] ?? '')
);

$description = trim(
    (string) ($seoItem['description'] ?? '')
);

$keywords = trim(
    (string) ($seoItem['keywords'] ?? '')
);

$altText = trim(
    (string) ($seoItem['altText'] ?? '')
);

if ($title === '') {
    $title = $route['title'];
}

if ($description === '') {
    $description = $route['description'];
}


// Canonical URL.
$canonical = $route['canonical'];


// =========================================================
// STANDARD SEO METADATA
// =========================================================

setPageTitle($html, $title);

setMetaName($html, 'description', $description);

if ($keywords !== '') {

    setMetaName($html, 'keywords', $keywords);

}

setCanonical($html, $canonical);


// =========================================================
// OPEN GRAPH
// =========================================================

setMetaProperty($html, 'og:title', $title);

setMetaProperty($html, 'og:description', $description);

setMetaProperty($html, 'og:type', 'website');

setMetaProperty($html, 'og:url', $canonical);

setMetaProperty(
    $html,
    'og:site_name',
    'Steel Craft Prefab'
);

setMetaProperty($html, 'og:image', $ogImage);


// =========================================================
// TWITTER METADATA
// =========================================================

setMetaName(
    $html,
    'twitter:card',
    'summary_large_image'
);

setMetaName($html, 'twitter:title', $title);

setMetaName($html, 'twitter:description', $description);

setMetaName($html, 'twitter:image', $ogImage);


// =========================================================
// ALT TEXT ATTRIBUTE
// =========================================================

if ($altText !== '') {

    $html = preg_replace(
        '~<html\b([^>]*)>~i',
        '<html$1 data-seo-alt-text="'
            . seoEscape($altText) . '">',
        $html,
        1
    );

}


// =========================================================
// SCHEMA.ORG
// =========================================================

$organization = [

    '@type' => 'Organization',

    '@id' => $siteUrl . '/#organization',

    'name' => 'Steel Craft Prefab',

    'url' => $siteUrl . '/',

];


$website = [

    '@type' => 'WebSite',

    '@id' => $siteUrl . '/#website',

    'url' => $siteUrl . '/',

    'name' => 'Steel Craft Prefab',

    'publisher' => [

        '@id' => $siteUrl . '/#organization',

    ],

    'inLanguage' => 'en-IN',

];


// Page schema type.
$pageType = 'WebPage';

if (
    $route['page'] === 'Project' ||
    $route['page'] === 'Home & Cottage'
) {

    $pageType = 'CollectionPage';

} elseif ($route['page'] === 'Contact') {

    $pageType = 'ContactPage';

} elseif ($route['page'] === 'About') {

    $pageType = 'AboutPage';

}


$pageSchema = [

    '@type' => $pageType,

    '@id' => $canonical . '#webpage',

    'url' => $canonical,

    'name' => $title,

    'description' => $description,

    'isPartOf' => [

        '@id' => $siteUrl . '/#website',

    ],

    'publisher' => [

        '@id' => $siteUrl . '/#organization',

    ],

    'inLanguage' => 'en-IN',

];


$schema = [

    '@context' => 'https://schema.org',

    '@graph' => [

        $organization,

        $website,

        $pageSchema,

    ],

];


setSchema($html, $schema);


// =========================================================
// STATIC H1 (HOME USES THE ADMIN DASHBOARD BANNER HEADING)
// =========================================================

$h1 = $route['h1'];
$h2 = '';

if ($path === '/') {

    $banner = fetchJsonCached($bannerApiUrl, 'banner', $cacheTtl);

    if (is_array($banner) && seoIsList($banner) && count($banner) > 0) {

        $latest = end($banner);

        if (is_array($latest)) {

            $bannerName = trim((string) ($latest['name'] ?? ''));
            $bannerSub = trim((string) ($latest['subtitle'] ?? ''));

            if ($bannerName !== '') {
                $h1 = $bannerName;
            }

            $h2 = $bannerSub;
        }
    }
}

injectRootHeading($html, $h1, $h2);


// =========================================================
// GOOGLE ANALYTICS
// =========================================================

addGoogleTag($html, $googleTagId);


// =========================================================
// STATIC INTERNAL LINKS
// =========================================================

addStaticInternalLinks(
    $html,
    $path,
    $routes
);


// =========================================================
// OUTPUT HTML
// =========================================================

sendHtml($html);