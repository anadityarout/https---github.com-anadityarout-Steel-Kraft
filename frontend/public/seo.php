
<?php

// =========================================================
// STEEL CRAFT PREFAB
// Dynamic SEO from Admin Dashboard
// AWS Lambda + Open Graph + Twitter + Schema.org
// Static Internal Links
// =========================================================


// =========================================================
// CONFIGURATION
// =========================================================

$apiUrl = 'https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo';

$siteUrl = 'https://steelcraftprefab.com';

$ogImage = $siteUrl . '/og/steel-craft-prefab-og.jpg';


// =========================================================
// ALL WEBSITE ROUTES
// =========================================================

$routes = [

    '/' => [
        'page' => 'Home',
        'canonical' => $siteUrl . '/',
        'h1' => 'Premium Prefab Homes, Modular Villas & Resort Cottages',
    ],

    '/about' => [
        'page' => 'About',
        'canonical' => $siteUrl . '/about',
        'h1' => 'About Steel Kraft Prefab',
    ],

    '/projects' => [
        'page' => 'Project',
        'canonical' => $siteUrl . '/projects',
        'h1' => 'Our Prefab Home & Villa Projects',
    ],

    '/homes-cottages' => [
        'page' => 'Home & Cottage',
        'canonical' => $siteUrl . '/homes-cottages',
        'h1' => 'Prefab Homes & Resort Cottages',
    ],

    '/work/1bhk' => [
        'page' => 'One BHK',
        'canonical' => $siteUrl . '/work/1bhk',
        'h1' => '1 BHK Prefab Home Designs',
    ],

    '/work/2bhk' => [
        'page' => 'Two BHK',
        'canonical' => $siteUrl . '/work/2bhk',
        'h1' => '2 BHK Prefab Home Designs',
    ],

    '/work/3bhk' => [
        'page' => 'Three BHK',
        'canonical' => $siteUrl . '/work/3bhk',
        'h1' => '3 BHK Prefab Home Designs',
    ],

    '/work/4bhk' => [
        'page' => 'Four BHK',
        'canonical' => $siteUrl . '/work/4bhk',
        'h1' => '4 BHK Prefab Home Designs',
    ],

    '/contact' => [
        'page' => 'Contact',
        'canonical' => $siteUrl . '/contact',
        'h1' => 'Contact Steel Craft Prefab',
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

            <h2>Explore More Pages</h2>

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

function sendHtml($html, $statusCode = 200)
{
    http_response_code($statusCode);

    header('Content-Type: text/html; charset=UTF-8');

    header(
        'Cache-Control: no-store, no-cache, must-revalidate, max-age=0'
    );

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


// =========================================================
// HANDLE AWS RESPONSE
// =========================================================

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

    error_log(
        'SEO: AWS API request failed; generating schema without saved SEO.'
    );

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


// Remove metadata inherited from the base template.
removePageSeo($html);


// =========================================================
// READ ADMIN DASHBOARD SEO DATA
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


// Canonical URL.
$canonical = $route['canonical'];


// =========================================================
// STANDARD SEO METADATA
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


// Add saved SEO fields.
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


// Generate schema for every configured route.
setSchema($html, $schema);


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

?>
