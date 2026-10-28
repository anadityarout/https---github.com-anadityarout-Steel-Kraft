<?php
// =========================================================
// STEEL CRAFT PREFAB
// Dynamic SEO from Admin Dashboard
// AWS Lambda + Open Graph + Twitter + Schema.org
// =========================================================

$apiUrl = 'https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo';
$siteUrl = 'https://www.steelcraftprefab.com';

// Make sure these paths match your React Router paths.
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
    '/onebhk' => [
        'page' => 'One BHK',
        'canonical' => $siteUrl . '/onebhk',
    ],
    '/twobhk' => [
        'page' => 'Two BHK',
        'canonical' => $siteUrl . '/twobhk',
    ],
    '/threebhk' => [
        'page' => 'Three BHK',
        'canonical' => $siteUrl . '/threebhk',
    ],
    '/fourbhk' => [
        'page' => 'Four BHK',
        'canonical' => $siteUrl . '/fourbhk',
    ],
    '/contact' => [
        'page' => 'Contact',
        'canonical' => $siteUrl . '/contact',
    ],
];


/* =========================================================
   HTML HELPERS
========================================================= */

function seoEscape($value)
{
    return htmlspecialchars(
        (string) $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}


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


function setCanonical(&$html, $url)
{
    $tag = '<link rel="canonical" href="' .
        seoEscape($url) . '">';

    $pattern = '~<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>~i';

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


/* =========================================================
   DETERMINE REQUESTED PAGE
========================================================= */

$path = parse_url(
    $_SERVER['REQUEST_URI'] ?? '/',
    PHP_URL_PATH
) ?: '/';

$path = '/' . trim($path, '/');

if ($path !== '/') {
    $path = rtrim($path, '/');
}

$route = $routes[$path] ?? null;


/* =========================================================
   LOAD BUILT REACT HTML TEMPLATE
========================================================= */

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


/* =========================================================
   FETCH SEO DATA FROM ADMIN DASHBOARD API
========================================================= */

if ($route !== null) {

    $context = stream_context_create([
        'http' => [
            'timeout' => 8,
            'ignore_errors' => true,
            'header' => "Accept: application/json\r\n",
        ],
    ]);

    $response = @file_get_contents(
        $apiUrl,
        false,
        $context
    );

    $decoded = is_string($response)
        ? json_decode($response, true)
        : null;

    // Lambda may return either:
    // 1. { "items": [...] }
    // 2. [ {...}, {...} ]

    if (
        is_array($decoded) &&
        isset($decoded['items']) &&
        is_array($decoded['items'])
    ) {
        $items = $decoded['items'];
    } elseif (is_array($decoded)) {
        $items = $decoded;
    } else {
        $items = [];

        error_log(
            'Steel Craft SEO API returned an invalid response.'
        );
    }

    // Find the SEO record for the requested page.
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


    /* =====================================================
       SEO VALUES FROM ADMIN DASHBOARD ONLY
    ===================================================== */

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


    /* =====================================================
       CANONICAL URL
    ===================================================== */

    // Use the fixed canonical URL for the requested route.
    // SEO title, description, keywords and alt text come
    // from the Admin Dashboard.

    $canonical = $route['canonical'];


    /* =====================================================
       STANDARD SEO METADATA
    ===================================================== */

    setPageTitle($html, $title);

    setMetaName(
        $html,
        'description',
        $description
    );

    setMetaName(
        $html,
        'keywords',
        $keywords
    );

    setCanonical(
        $html,
        $canonical
    );


    /* =====================================================
       OPEN GRAPH AND TWITTER METADATA
    ===================================================== */

    // Replace this with the real, publicly accessible
    // image URL if your website uses a different image.
    $ogImage = $siteUrl . '/assets/steel-craft-og-image.jpg';

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

    $socialTags = [
        '<!-- Open Graph -->',
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

        '<!-- Twitter -->',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:title" content="' .
            seoEscape($title) . '">',
        '<meta name="twitter:description" content="' .
            seoEscape($description) . '">',
        '<meta name="twitter:image" content="' .
            seoEscape($ogImage) . '">',
    ];

    $html = preg_replace(
        '~</head>~i',
        implode("\n    ", $socialTags) . "\n</head>",
        $html,
        1
    );


    /* =====================================================
       ALT TEXT FROM ADMIN DASHBOARD
    ===================================================== */

    // This exposes the saved alt text as an HTML attribute.
    // It does not automatically change the alt attributes
    // of individual images rendered by React.

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


    /* =====================================================
       SCHEMA.ORG SHARED ENTITIES
    ===================================================== */

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


    /* =====================================================
       PAGE-SPECIFIC SCHEMA
    ===================================================== */

    switch ($route['page']) {

        case 'Home':
            $pageType = 'WebPage';
            break;

        case 'Project':
        case 'Home & Cottage':
            $pageType = 'CollectionPage';
            break;

        case 'Contact':
            $pageType = 'ContactPage';
            break;

        case 'One BHK':
        case 'Two BHK':
        case 'Three BHK':
        case 'Four BHK':
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


    /* =====================================================
       FINAL JSON-LD GRAPH
    ===================================================== */

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


/* =========================================================
   RETURN HTML
========================================================= */

header('Content-Type: text/html; charset=UTF-8');

header(
    'Cache-Control: no-store, no-cache, must-revalidate, max-age=0'
);

header('Pragma: no-cache');

echo $html;