
<?php
// =========================================================
// STEEL CRAFT PREFAB
// Dynamic SEO from Admin Dashboard
// AWS Lambda + Open Graph + Twitter + Schema.org
// =========================================================

$apiUrl = 'https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo';
$siteUrl = 'https://www.steelcraftprefab.com';
$ogImage = $siteUrl . '/assets/steel-craft-og-image.jpg';

// =========================================================
// REACT ROUTES
// Must match App.jsx exactly
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
// HTML ESCAPING
// =========================================================

function seoEscape($value)
{
    return htmlspecialchars(
        (string) $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

// =========================================================
// SET OR INSERT META TAG
// =========================================================

function setMetaName(&$html, $name, $content)
{
    $safeName = preg_quote($name, '~');

    $tag = '<meta name="' . seoEscape($name) .
        '" content="' . seoEscape($content) . '">';

    $pattern = '~<meta\b(?=[^>]*\bname=["\']' .
        $safeName . '["\'])[^>]*>~i';

    if (preg_match($pattern, $html)) {
        $html = preg_replace($pattern, $tag, $html, 1);
    } else {
        $html = preg_replace(
            '~</head>~i',
            $tag . "\n</head>",
            $html,
            1
        );
    }
}

// =========================================================
// SET OR INSERT PROPERTY META TAG
// =========================================================

function setMetaProperty(&$html, $property, $content)
{
    $safeProperty = preg_quote($property, '~');

    $tag = '<meta property="' . seoEscape($property) .
        '" content="' . seoEscape($content) . '">';

    $pattern = '~<meta\b(?=[^>]*\bproperty=["\']' .
        $safeProperty . '["\'])[^>]*>~i';

    if (preg_match($pattern, $html)) {
        $html = preg_replace($pattern, $tag, $html, 1);
    } else {
        $html = preg_replace(
            '~</head>~i',
            $tag . "\n</head>",
            $html,
            1
        );
    }
}

// =========================================================
// SET OR INSERT CANONICAL URL
// =========================================================

function setCanonical(&$html, $url)
{
    $tag = '<link rel="canonical" href="' .
        seoEscape($url) . '">';

    $pattern =
        '~<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>~i';

    if (preg_match($pattern, $html)) {
        $html = preg_replace($pattern, $tag, $html, 1);
    } else {
        $html = preg_replace(
            '~</head>~i',
            $tag . "\n</head>",
            $html,
            1
        );
    }
}

// =========================================================
// SET OR INSERT TITLE
// =========================================================

function setPageTitle(&$html, $title)
{
    $tag = '<title>' . seoEscape($title) . '</title>';

    if (preg_match('~<title\b[^>]*>.*?</title>~is', $html)) {
        $html = preg_replace(
            '~<title\b[^>]*>.*?</title>~is',
            $tag,
            $html,
            1
        );
    } else {
        $html = preg_replace(
            '~</head>~i',
            $tag . "\n</head>",
            $html,
            1
        );
    }
}

// =========================================================
// SET OR INSERT SCHEMA.ORG
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
            'Steel Craft SEO schema encoding failed: ' .
            json_last_error_msg()
        );
        return;
    }

    $tag = "<!-- Schema.org -->\n" .
        "<script type=\"application/ld+json\">\n" .
        $json . "\n</script>";

    $pattern =
        '~<script\b(?=[^>]*type=["\']application/ld\+json["\'])[^>]*>.*?</script>~is';

    if (preg_match($pattern, $html)) {
        $html = preg_replace($pattern, $tag, $html, 1);
    } else {
        $html = preg_replace(
            '~</head>~i',
            $tag . "\n</head>",
            $html,
            1
        );
    }
}

// =========================================================
// DETERMINE REQUESTED PAGE
// =========================================================

$path = parse_url(
    $_SERVER['REQUEST_URI'] ?? '/',
    PHP_URL_PATH
) ?: '/';

$path = '/' . trim($path, '/');

if ($path !== '/') {
    $path = rtrim($path, '/');
}

$route = $routes[$path] ?? null;

// =========================================================
// LOAD REACT HTML TEMPLATE
// =========================================================

$htmlFile = __DIR__ . '/index.html';

if (!is_file($htmlFile)) {
    http_response_code(500);
    exit('Website HTML not found.');
}

$html = file_get_contents($htmlFile);

if ($html === false) {
    http_response_code(500);
    exit('Unable to load website HTML.');
}

// =========================================================
// FETCH SEO DATA FROM AWS LAMBDA
// =========================================================

if ($route !== null) {
    $context = stream_context_create([
        'http' => [
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

    if ($response === false) {
        error_log('Steel Craft SEO API request failed.');
        http_response_code(502);
        exit('Unable to retrieve SEO data.');
    }

    $decoded = json_decode($response, true);

    if (
        is_array($decoded) &&
        isset($decoded['items']) &&
        is_array($decoded['items'])
    ) {
        $items = $decoded['items'];
    } elseif (is_array($decoded) && array_is_list($decoded)) {
        $items = $decoded;
    } else {
        error_log('Steel Craft SEO API returned invalid JSON data.');
        http_response_code(502);
        exit('Invalid SEO API response.');
    }

    // Find the exact Admin Dashboard record.
    $seoItem = null;

    foreach ($items as $item) {
        if (
            is_array($item) &&
            strcasecmp(
                trim((string) ($item['page'] ?? '')),
                $route['page']
            ) === 0
        ) {
            $seoItem = $item;
            break;
        }
    }

    if ($seoItem === null) {
        error_log(
            'SEO record not found for page: ' . $route['page']
        );

        http_response_code(500);
        exit('SEO record not found. Check the SEO Admin Dashboard.');
    }

    // =====================================================
    // SEO DATA FROM ADMIN DASHBOARD
    // =====================================================

    $title = trim((string) ($seoItem['metaTitle'] ?? ''));
    $description = trim((string) ($seoItem['description'] ?? ''));
    $keywords = trim((string) ($seoItem['keywords'] ?? ''));
    $altText = trim((string) ($seoItem['altText'] ?? ''));

    if ($title === '' || $description === '') {
        error_log(
            'SEO title or description is empty for: ' .
            $route['page']
        );

        http_response_code(500);
        exit('SEO title or description is missing in the dashboard.');
    }

    // Use the canonical URL belonging to the requested route.
    $canonical = $route['canonical'];

    // =====================================================
    // STANDARD SEO TAGS
    // =====================================================

    setPageTitle($html, $title);
    setMetaName($html, 'description', $description);
    setMetaName($html, 'keywords', $keywords);
    setCanonical($html, $canonical);

    // =====================================================
    // OPEN GRAPH AND TWITTER TAGS
    // =====================================================

    $socialTags = [
        '<meta property="og:title" content="' .
            seoEscape($title) . '">',
        '<meta property="og:description" content="' .
            seoEscape($description) . '">',
        '<meta property="og:type" content="website">',
        '<meta property="og:url" content="' .
            seoEscape($canonical) . '">',
        '<meta property="og:site_name" content="Steel Craft Prefab">',
        '<meta property="og:image" content="' .
            seoEscape($ogImage) . '">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:title" content="' .
            seoEscape($title) . '">',
        '<meta name="twitter:description" content="' .
            seoEscape($description) . '">',
        '<meta name="twitter:image" content="' .
            seoEscape($ogImage) . '">',
    ];

    // Remove existing Open Graph tags.
    $html = preg_replace(
        '~<meta\b(?=[^>]*\bproperty=["\']og:[^"\']+["\'])[^>]*>\s*~i',
        '',
        $html
    );

    // Remove existing Twitter tags.
    $html = preg_replace(
        '~<meta\b(?=[^>]*\bname=["\']twitter:[^"\']+["\'])[^>]*>\s*~i',
        '',
        $html
    );

    $html = preg_replace(
        '~</head>~i',
        implode("\n    ", $socialTags) . "\n</head>",
        $html,
        1
    );

    // =====================================================
    // ALT TEXT DATA ATTRIBUTE
    // =====================================================

    // This attribute exposes the saved value.
    // React image alt attributes must be updated separately.
    if (preg_match('~<html\b[^>]*>~i', $html)) {
        if (
            preg_match(
                '~\sdata-seo-alt-text=["\'][^"\']*["\']~i',
                $html
            )
        ) {
            $html = preg_replace(
                '~\sdata-seo-alt-text=["\'][^"\']*["\']~i',
                ' data-seo-alt-text="' .
                    seoEscape($altText) . '"',
                $html,
                1
            );
        } else {
            $html = preg_replace(
                '~<html\b([^>]*)>~i',
                '<html$1 data-seo-alt-text="' .
                    seoEscape($altText) . '">',
                $html,
                1
            );
        }
    }

    // =====================================================
    // SCHEMA.ORG
    // =====================================================

    $organization = [
        '@type' => 'Organization',
        '@id' => $siteUrl . '/#organization',
        'name' => 'Steel Craft Prefab',
        'url' => $siteUrl . '/',
        'logo' => [
            '@type' => 'ImageObject',
            'url' => $siteUrl .
                '/assets/Steel%20Kraft%20Logo--o4TBwkp.png',
        ],
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

    $localBusiness = [
        '@type' => 'LocalBusiness',
        '@id' => $siteUrl . '/#localbusiness',
        'name' => 'Steel Craft Prefab',
        'url' => $siteUrl . '/',
        'image' => $ogImage,
        'parentOrganization' => [
            '@id' => $siteUrl . '/#organization',
        ],
    ];

    switch ($route['page']) {
        case 'Project':
        case 'Home & Cottage':
            $pageType = 'CollectionPage';
            break;

        case 'Contact':
            $pageType = 'ContactPage';
            break;

        default:
            $pageType = 'WebPage';
            break;
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
        'about' => [
            '@id' => $siteUrl . '/#organization',
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
            $localBusiness,
            $website,
            $pageSchema,
        ],
    ];

    setSchema($html, $schema);
}

// =========================================================
// RESPONSE HEADERS
// =========================================================

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

// Return the HTML document.
echo $html;
