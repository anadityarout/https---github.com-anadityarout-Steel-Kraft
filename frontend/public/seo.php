
<?php
// Steel Craft Prefab - Dynamic SEO, Open Graph, Twitter and Schema.org

$apiUrl = 'https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo';
$siteUrl = 'https://www.steelcraftprefab.com';

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
            'Unable to encode Steel Craft Schema.org JSON-LD: ' .
            json_last_error_msg()
        );
        return;
    }

    $tag = "<!-- Schema.org -->\n" .
        "<script type=\"application/ld+json\">\n" .
        $json . "\n" .
        "</script>";

    // Replace an existing JSON-LD script or add one if missing.
    $pattern =
        '~<script\b(?=[^>]*type=["\']application/ld\+json["\'])[^>]*>.*?</script>~is';

    if (preg_match($pattern, $html)) {
        $html = preg_replace(
            $pattern,
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

/* =========================================================
   DETERMINE THE REQUESTED PAGE
========================================================= */

$path = parse_url(
    $_SERVER['REQUEST_URI'] ?? '/',
    PHP_URL_PATH
) ?: '/';

$path = '/' . trim($path, '/');

if ($path === '//') {
    $path = '/';
}

$route = $routes[$path] ?? null;

/* =========================================================
   LOAD THE BUILT REACT HTML TEMPLATE
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
   FETCH SEO DATA FROM THE ADMIN DASHBOARD API
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

    $items = is_string($response)
        ? json_decode($response, true)
        : null;

    if (is_array($items)) {
        if (
            isset($items['items']) &&
            is_array($items['items'])
        ) {
            $items = $items['items'];
        }
    } else {
        $items = [];
    }

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

    /* ---------- SEO values ---------- */

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
        $title = 'Steel Craft Prefab';
    }

    if ($description === '') {
        $description =
            'Explore prefab homes, cottages and prefabricated construction solutions from Steel Craft Prefab.';
    }

    /* ---------- Canonical URL ---------- */

    $canonical = trim(
        (string) ($seoItem['canonicalUrl'] ?? '')
    );

    $host = strtolower(
        (string) parse_url($canonical, PHP_URL_HOST)
    );

    $scheme = strtolower(
        (string) parse_url($canonical, PHP_URL_SCHEME)
    );

    if (
        !in_array(
            $host,
            [
                'www.steelcraftprefab.com',
                'steelcraftprefab.com',
            ],
            true
        ) ||
        $scheme !== 'https'
    ) {
        $canonical = $route['canonical'];
    }

    // Always use the correct route URL.
    $canonical = $route['canonical'];

    /* =====================================================
       STANDARD SEO METADATA
    ===================================================== */

    setPageTitle($html, $title);
    setMetaName($html, 'description', $description);
    setMetaName($html, 'keywords', $keywords);
    setCanonical($html, $canonical);

    
    /* =====================================================
       OPEN GRAPH METADATA
    ===================================================== */

    // Confirm this image exists and is publicly accessible.
    $ogImage = $siteUrl . '/assets/steel-craft-og-image.jpg';

    // Remove existing Open Graph tags to prevent duplicates.
    $html = preg_replace(
        '~<meta\b(?=[^>]*\bproperty=["\']og:[^"\']+["\'])[^>]*>\s*~i',
        '',
        $html
    );

    // Remove existing Twitter tags to prevent duplicates.
    $html = preg_replace(
        '~<meta\b(?=[^>]*\bname=["\']twitter:[^"\']+["\'])[^>]*>\s*~i',
        '',
        $html
    );

    // Create the Open Graph section.
    $openGraphTags = [
        '<!-- Open Graph -->',
        '<meta property="og:title" content="' . seoEscape($title) . '">',
        '<meta property="og:description" content="' . seoEscape($description) . '">',
        '<meta property="og:type" content="website">',
        '<meta property="og:url" content="' . seoEscape($canonical) . '">',
        '<meta property="og:site_name" content="Steel Craft Prefab">',
        '<meta property="og:image" content="' . seoEscape($ogImage) . '">',
    ];

    // Create the Twitter section.
    $twitterTags = [
        '<!-- Twitter -->',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:title" content="' . seoEscape($title) . '">',
        '<meta name="twitter:description" content="' . seoEscape($description) . '">',
        '<meta name="twitter:image" content="' . seoEscape($ogImage) . '">',
    ];

    // Insert both sections into the HTML head.
    $socialTags = implode("\n    ", array_merge(
        $openGraphTags,
        [''],
        $twitterTags
    ));

    $html = preg_replace(
        '~</head>~i',
        $socialTags . "\n</head>",
        $html,
        1
    );


    /* =====================================================
       SAVED ALT TEXT
    ===================================================== */

    // This exposes the saved value in the HTML document.
    // It does not automatically change React image alt attributes.
    if (preg_match('~<html\b[^>]*>~i', $html)) {
        if (
            preg_match(
                '~\sdata-seo-alt-text=["\'][^"\']*["\']~i',
                $html
            )
        ) {
            $html = preg_replace(
                '~\sdata-seo-alt-text=["\'][^"\']*["\']~i',
                ' data-seo-alt-text="' . seoEscape($altText) . '"',
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

    // Add LocalBusiness only with genuine business details.
    // Telephone, email and address are not invented here.
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

            $pageSchema = [
                '@type' => 'WebPage',
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
                'mainEntity' => [
                    '@id' => $siteUrl . '/#organization',
                ],
                'publisher' => [
                    '@id' => $siteUrl . '/#organization',
                ],
                'inLanguage' => 'en-IN',
            ];

            break;

        case 'Home & Cottage':

            $pageSchema = [
                '@type' => 'CollectionPage',
                '@id' => $canonical . '#webpage',
                'url' => $canonical,
                'name' => $title,
                'description' => $description,
                'isPartOf' => [
                    '@id' => $siteUrl . '/#website',
                ],
                'about' => [
                    '@type' => 'Thing',
                    'name' => 'Prefabricated Homes and Cottages',
                    'description' =>
                        'Prefabricated homes, cottages and modular living solutions.',
                ],
                'publisher' => [
                    '@id' => $siteUrl . '/#organization',
                ],
                'inLanguage' => 'en-IN',
            ];

            break;

        case 'Project':

            $pageSchema = [
                '@type' => 'CollectionPage',
                '@id' => $canonical . '#webpage',
                'url' => $canonical,
                'name' => $title,
                'description' => $description,
                'isPartOf' => [
                    '@id' => $siteUrl . '/#website',
                ],
                'about' => [
                    '@type' => 'Thing',
                    'name' => 'Prefab Construction Projects',
                    'description' =>
                        'Prefabricated buildings and construction projects.',
                ],
                'mainEntity' => [
                    '@type' => 'ItemList',
                    '@id' => $canonical . '#project-list',
                    'name' => 'Steel Craft Prefab Projects',
                    'itemListOrder' =>
                        'https://schema.org/ItemListOrderAscending',
                ],
                'publisher' => [
                    '@id' => $siteUrl . '/#organization',
                ],
                'inLanguage' => 'en-IN',
            ];

            break;

        case 'Contact':

            $pageSchema = [
                '@type' => 'ContactPage',
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

            break;

        default:

            $pageSchema = [
                '@type' => 'WebPage',
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
            ];

            break;
    }

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
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

echo $html;
