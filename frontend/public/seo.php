
<?php
// Steel Craft Prefab - Dynamic SEO + Page-Specific Schema.org

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

/* ---------- HTML helpers ---------- */

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
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE |
        JSON_HEX_TAG |
        JSON_HEX_AMP |
        JSON_HEX_APOS |
        JSON_HEX_QUOT
    );

    if ($json === false) {
        return;
    }

    $tag = '<script type="application/ld+json">' .
        $json .
        '</script>';

    $pattern = '~<script\b(?=[^>]*type=["\']application/ld\+json["\'])[^>]*>.*?</script>~is';

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

/* ---------- Resolve requested page ---------- */

$path = parse_url(
    $_SERVER['REQUEST_URI'] ?? '/',
    PHP_URL_PATH
) ?: '/';

$path = '/' . trim($path, '/');

if ($path === '//') {
    $path = '/';
}

$route = $routes[$path] ?? null;

/* ---------- Load React HTML ---------- */

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

/* ---------- Fetch saved SEO data ---------- */

if ($route !== null) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 5,
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

    $seoItem = null;

    if (is_array($items)) {
        // Support either a direct array or { "items": [...] }.
        if (isset($items['items']) && is_array($items['items'])) {
            $items = $items['items'];
        }

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
    }

    // Defaults used if the API has no entry for this page.
    $title = trim((string) ($seoItem['metaTitle'] ?? ''));
    $description = trim((string) ($seoItem['description'] ?? ''));
    $keywords = trim((string) ($seoItem['keywords'] ?? ''));
    $altText = trim((string) ($seoItem['altText'] ?? ''));

    if ($title === '') {
        $title = 'Steel Craft Prefab';
    }

    if ($description === '') {
        $description =
            'Explore prefab buildings and construction solutions from Steel Craft Prefab.';
    }

    /* ---------- Validate canonical URL ---------- */

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
            ['www.steelcraftprefab.com', 'steelcraftprefab.com'],
            true
        ) ||
        $scheme !== 'https'
    ) {
        $canonical = $route['canonical'];
    }

    // Use the route's own URL even if an admin entry has the wrong path.
    $expectedCanonical = $route['canonical'];

    if (
        rtrim($canonical, '/') !== rtrim($expectedCanonical, '/') &&
        $route['page'] !== 'Home'
    ) {
        $canonical = $expectedCanonical;
    }

    if ($route['page'] === 'Home') {
        $canonical = $expectedCanonical;
    }

    /* ---------- Standard SEO tags ---------- */

    setPageTitle($html, $title);
    setMetaName($html, 'description', $description);
    setMetaName($html, 'keywords', $keywords);
    setCanonical($html, $canonical);

    /* ---------- Open Graph ---------- */

    // Ensure this image exists and is publicly accessible.
    $ogImage = $siteUrl . '/assets/steel-craft-og-image.jpg';

    setMetaProperty($html, 'og:title', $title);
    setMetaProperty($html, 'og:description', $description);
    setMetaProperty($html, 'og:type', 'website');
    setMetaProperty($html, 'og:url', $canonical);
    setMetaProperty($html, 'og:site_name', 'Steel Craft Prefab');
    setMetaProperty($html, 'og:image', $ogImage);

    /* ---------- Twitter metadata ---------- */

    setMetaName($html, 'twitter:card', 'summary_large_image');
    setMetaName($html, 'twitter:title', $title);
    setMetaName($html, 'twitter:description', $description);
    setMetaName($html, 'twitter:image', $ogImage);

    /* ---------- Saved alt text data attribute ---------- */

    if (preg_match('~<html\b[^>]*>~i', $html)) {
        if (preg_match('~\sdata-seo-alt-text=["\'][^"\']*["\']~i', $html)) {
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

    /* ---------- Page-specific Schema.org ---------- */

    $organization = [
        '@type' => 'Organization',
        '@id' => $siteUrl . '/#organization',
        'name' => 'Steel Craft Prefab',
        'url' => $siteUrl . '/',
        'logo' => [
            '@type' => 'ImageObject',
            'url' => $siteUrl . '/assets/Steel%20Kraft%20Logo.png',
        ],
    ];

    $website = [
        '@type' => 'WebSite',
        '@id' => $siteUrl . '/#website',
        'name' => 'Steel Craft Prefab',
        'url' => $siteUrl . '/',
        'publisher' => [
            '@id' => $siteUrl . '/#organization',
        ],
    ];

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
                    '@id' => $siteUrl . '/#organization',
                ],
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
                    '@id' => $siteUrl . '/#organization',
                ],
            ];
            break;

        case 'Contact':
        default:
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
            ];
            break;
    }

    $schema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            $organization,
            $website,
            $pageSchema,
        ],
    ];

    setSchema($html, $schema);
}

/* ---------- Return HTML ---------- */

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

echo $html;
