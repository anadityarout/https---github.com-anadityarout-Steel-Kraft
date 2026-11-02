
<?php
// =========================================================
// STEEL CRAFT PREFAB
// Dynamic SEO from Admin Dashboard
// AWS Lambda + Open Graph + Twitter + Schema.org
// Schema is generated even when SEO data is missing.
// =========================================================

$apiUrl = 'https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo';
$siteUrl = 'https://www.steelcraftprefab.com';
$ogImage = $siteUrl . '/assets/steel-craft-og-image.jpg';

// =========================================================
// ROUTES FROM APP.JSX
// =========================================================

$routes = [
    '/' => [
        'page' => 'Home',
        'canonical' => $siteUrl . '/',
    ],
    '/projects' => [
        'page' => 'Project',
        'canonical' => $siteUrl . '/projects',
    ],
    '/homes-cottages' => [
        'page' => 'Home & Cottage',
        'canonical' => $siteUrl . '/homes-cottages',
    ],
    '/work/1bhk' => [
        'page' => 'One BHK',
        'canonical' => $siteUrl . '/work/1bhk',
    ],
    '/work/2bhk' => [
        'page' => 'Two BHK',
        'canonical' => $siteUrl . '/work/2bhk',
    ],
    '/work/3bhk' => [
        'page' => 'Three BHK',
        'canonical' => $siteUrl . '/work/3bhk',
    ],
    '/work/4bhk' => [
        'page' => 'Four BHK',
        'canonical' => $siteUrl . '/work/4bhk',
    ],
    '/contact' => [
        'page' => 'Contact',
        'canonical' => $siteUrl . '/contact',
    ],
];

// =========================================================
// HELPERS
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

function setPageTitle(&$html, $title)
{
    $tag = '<title>' . seoEscape($title) . '</title>';

    replaceHeadTag(
        $html,
        '~<title\b[^>]*>.*?</title>~is',
        $tag
    );
}

function setMetaName(&$html, $name, $content)
{
    $safeName = preg_quote($name, '~');

    $pattern = '~<meta\b(?=[^>]*\bname=["\']' .
        $safeName . '["\'])[^>]*>~i';

    $tag = '<meta name="' . seoEscape($name) .
        '" content="' . seoEscape($content) . '">';

    replaceHeadTag($html, $pattern, $tag);
}

function setMetaProperty(&$html, $property, $content)
{
    $safeProperty = preg_quote($property, '~');

    $pattern = '~<meta\b(?=[^>]*\bproperty=["\']' .
        $safeProperty . '["\'])[^>]*>~i';

    $tag = '<meta property="' . seoEscape($property) .
        '" content="' . seoEscape($content) . '">';

    replaceHeadTag($html, $pattern, $tag);
}

function setCanonical(&$html, $url)
{
    $pattern =
        '~<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>~i';

    $tag = '<link rel="canonical" href="' .
        seoEscape($url) . '">';

    replaceHeadTag($html, $pattern, $tag);
}

function removePageSeo(&$html)
{
    // Remove page title.
    $html = preg_replace(
        '~<title\b[^>]*>.*?</title>\s*~is',
        '',
        $html
    );

    // Remove standard SEO and Twitter metadata.
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

    // Remove existing canonical link.
    $html = preg_replace(
        '~<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>\s*~i',
        '',
        $html
    );

    // Remove old JSON-LD so the correct page schema can be added.
    $html = preg_replace(
        '~<script\b(?=[^>]*\btype=["\']application/ld\+json["\'])[^>]*>.*?</script>\s*~is',
        '',
        $html
    );

    // Remove the previous SEO alt-text attribute.
    $html = preg_replace(
        '~\sdata-seo-alt-text=(["\']).*?\1~i',
        '',
        $html
    );
}

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

    $tag = "<script type=\"application/ld+json\">\n" .
        $json . "\n</script>";

    $pattern =
        '~<script\b(?=[^>]*\btype=["\']application/ld\+json["\'])[^>]*>.*?</script>~is';

    replaceHeadTag($html, $pattern, $tag);
}

function sendHtml($html, $statusCode = 200)
{
    http_response_code($statusCode);

    header('Content-Type: text/html; charset=UTF-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    echo $html;
    exit;
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
// LOAD REACT HTML TEMPLATE
// =========================================================

$htmlFile = __DIR__ . '/index.html';

if (!is_file($htmlFile)) {
    error_log('SEO: index.html was not found at ' . $htmlFile);
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
// Do not reuse Home metadata or schema.
// =========================================================

if (!isset($routes[$path])) {
    removePageSeo($html);
    sendHtml($html);
}

$route = $routes[$path];

// =========================================================
// FETCH SEO DATA FROM AWS LAMBDA
// =========================================================

$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'timeout' => 10,
        'ignore_errors' => true,
        'header' => "Accept: application/json\r\n",
    ],
]);

$response = @file_get_contents(
    $apiUrl,
    false,
    $context
);

// If the API is temporarily unavailable, still return
// the page with its schema instead of returning an error.
$items = [];

if ($response !== false) {
    $decoded = json_decode($response, true);

    if (
        is_array($decoded) &&
        isset($decoded['items']) &&
        is_array($decoded['items'])
    ) {
        $items = $decoded['items'];
    } elseif (
        is_array($decoded) &&
        array_is_list($decoded)
    ) {
        $items = $decoded;
    } else {
        error_log('SEO: AWS API returned invalid JSON.');
    }
} else {
    error_log('SEO: AWS API request failed; generating schema without saved SEO.');
}

// =========================================================
// MATCH THE REQUESTED PAGE
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

// Missing record is allowed.
// Schema will still be generated below.
$seoItem = is_array($seoItem) ? $seoItem : [];

// Remove metadata inherited from the base template.
// Google Analytics is not removed.
removePageSeo($html);

// =========================================================
// READ SAVED DASHBOARD DATA
// =========================================================

$title = trim((string) ($seoItem['metaTitle'] ?? ''));
$description = trim((string) ($seoItem['description'] ?? ''));
$keywords = trim((string) ($seoItem['keywords'] ?? ''));
$altText = trim((string) ($seoItem['altText'] ?? ''));

// Use the canonical URL assigned to this route.
$canonical = $route['canonical'];

// =========================================================
// STANDARD SEO METADATA
// Only add fields that exist in Admin Dashboard.
// =========================================================

if ($title !== '') {
    setPageTitle($html, $title);
}

if ($description !== '') {
    setMetaName($html, 'description', $description);
}

if ($keywords !== '') {
    setMetaName($html, 'keywords', $keywords);
}

setCanonical($html, $canonical);

// =========================================================
// OPEN GRAPH
// =========================================================

if ($title !== '') {
    setMetaProperty($html, 'og:title', $title);
}

if ($description !== '') {
    setMetaProperty($html, 'og:description', $description);
}

setMetaProperty($html, 'og:type', 'website');
setMetaProperty($html, 'og:url', $canonical);
setMetaProperty($html, 'og:site_name', 'Steel Craft Prefab');
setMetaProperty($html, 'og:image', $ogImage);

// =========================================================
// TWITTER METADATA
// =========================================================

setMetaName($html, 'twitter:card', 'summary_large_image');

if ($title !== '') {
    setMetaName($html, 'twitter:title', $title);
}

if ($description !== '') {
    setMetaName($html, 'twitter:description', $description);
}

setMetaName($html, 'twitter:image', $ogImage);

// =========================================================
// ALT TEXT ATTRIBUTE
// =========================================================

if ($altText !== '') {
    $html = preg_replace(
        '~<html\b([^>]*)>~i',
        '<html$1 data-seo-alt-text="' . seoEscape($altText) . '">',
        $html,
        1
    );
}

// =========================================================
// SCHEMA.ORG
// ALWAYS GENERATED FOR EVERY CONFIGURED ROUTE
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

$pageType = 'WebPage';

if (
    $route['page'] === 'Project' ||
    $route['page'] === 'Home & Cottage'
) {
    $pageType = 'CollectionPage';
} elseif ($route['page'] === 'Contact') {
    $pageType = 'ContactPage';
}

$pageSchema = [
    '@type' => $pageType,
    '@id' => $canonical . '#webpage',
    'url' => $canonical,
    'isPartOf' => [
        '@id' => $siteUrl . '/#website',
    ],
    'publisher' => [
        '@id' => $siteUrl . '/#organization',
    ],
    'inLanguage' => 'en-IN',
];

// Only include SEO fields that were actually saved.
if ($title !== '') {
    $pageSchema['name'] = $title;
}

if ($description !== '') {
    $pageSchema['description'] = $description;
}

$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        $organization,
        $website,
        $pageSchema,
    ],
];

// Always add schema, regardless of whether an SEO record exists.
setSchema($html, $schema);

// =========================================================
// OUTPUT HTML
// =========================================================

sendHtml($html);
