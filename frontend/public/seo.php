
<?php
// Steel Craft Prefab - Dynamic SEO HTML

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

function seoEscape($value) {
    return htmlspecialchars(
        (string) $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

function setMetaName(&$html, $name, $content) {
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

function setMetaProperty(&$html, $property, $content) {
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

function setCanonical(&$html, $url) {
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

// Resolve the requested route.
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$path = '/' . trim($path, '/');

if ($path === '//') {
    $path = '/';
}

$route = $routes[$path] ?? null;

// Load the built React HTML template.
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

if ($route !== null) {
    // Read current SEO data from AWS.
    $context = stream_context_create([
        'http' => [
            'timeout' => 5,
            'ignore_errors' => true,
            'header' => "Accept: application/json\r\n",
        ],
    ]);

    $response = @file_get_contents($apiUrl, false, $context);
    $items = is_string($response)
        ? json_decode($response, true)
        : null;

    if (is_array($items)) {
        foreach ($items as $item) {
            if (
                !is_array($item) ||
                strcasecmp(
                    trim((string) ($item['page'] ?? '')),
                    $route['page']
                ) !== 0
            ) {
                continue;
            }

            $title = trim((string) ($item['metaTitle'] ?? ''));
            $description = trim((string) ($item['description'] ?? ''));
            $keywords = trim((string) ($item['keywords'] ?? ''));
            $canonical = trim((string) ($item['canonicalUrl'] ?? ''));

            // Only accept canonical URLs on your own domain.
            $host = strtolower((string) parse_url($canonical, PHP_URL_HOST));

            if (
                !in_array(
                    $host,
                    ['www.steelcraftprefab.com', 'steelcraftprefab.com'],
                    true
                ) ||
                strtolower((string) parse_url($canonical, PHP_URL_SCHEME)) !== 'https'
            ) {
                $canonical = $route['canonical'];
            }

            if ($title === '') {
                $title = 'Steel Craft Prefab';
            }

            if ($description === '') {
                $description = 'Explore prefab buildings and construction solutions from Steel Craft Prefab.';
            }

            // Update title.
            $titleTag = '<title>' . seoEscape($title) . '</title>';

            if (preg_match('~<title\b[^>]*>.*?</title>~is', $html)) {
                $html = preg_replace(
                    '~<title\b[^>]*>.*?</title>~is',
                    $titleTag,
                    $html,
                    1
                );
            } else {
                $html = preg_replace(
                    '~</head>~i',
                    $titleTag . "\n</head>",
                    $html,
                    1
                );
            }

            // Standard SEO metadata.
            setMetaName($html, 'description', $description);
            setMetaName($html, 'keywords', $keywords);
            setCanonical($html, $canonical);

            // Open Graph metadata.
            setMetaProperty($html, 'og:title', $title);
            setMetaProperty($html, 'og:description', $description);
            setMetaProperty($html, 'og:type', 'website');
            setMetaProperty($html, 'og:url', $canonical);
            setMetaProperty($html, 'og:site_name', 'Steel Craft Prefab');

            // Use a real, publicly accessible image URL here.
            // Replace this path with your actual share/preview image.
            $ogImage = $siteUrl . '/assets/steel-craft-og-image.jpg';
            setMetaProperty($html, 'og:image', $ogImage);

            // Twitter card metadata.
            setMetaName($html, 'twitter:card', 'summary_large_image');
            setMetaName($html, 'twitter:title', $title);
            setMetaName($html, 'twitter:description', $description);
            setMetaName($html, 'twitter:image', $ogImage);

            // Expose the saved alt text as data, but do not pretend this
            // adds alt attributes to React images that are not in this HTML.
            $altText = trim((string) ($item['altText'] ?? ''));

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

            break;
        }
    }
}

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

echo $html;
