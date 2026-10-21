
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

// Identify requested page.
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = '/' . trim($path, '/');

if ($path === '//') {
    $path = '/';
}

$route = $routes[$path] ?? null;

// seo.php and index.html must be in the same directory.
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
                    trim((string)($item['page'] ?? '')),
                    $route['page']
                ) !== 0
            ) {
                continue;
            }

            $title = trim((string)($item['metaTitle'] ?? ''));
            $description = trim((string)($item['description'] ?? ''));
            $keywords = trim((string)($item['keywords'] ?? ''));
            $altText = trim((string)($item['altText'] ?? ''));
            $canonical = trim((string)($item['canonicalUrl'] ?? ''));

            // Update page title.
            if ($title !== '') {
                $html = preg_replace(
                    '~<title>.*?</title>~is',
                    '<title>' .
                    htmlspecialchars(
                        $title,
                        ENT_QUOTES | ENT_SUBSTITUTE,
                        'UTF-8'
                    ) .
                    '</title>',
                    $html,
                    1
                );
            }

            // Update meta description.
            if ($description !== '') {
                $html = preg_replace(
                    '~<meta\s+name=["\']description["\'][^>]*>~i',
                    '<meta name="description" content="' .
                    htmlspecialchars(
                        $description,
                        ENT_QUOTES | ENT_SUBSTITUTE,
                        'UTF-8'
                    ) .
                    '">',
                    $html,
                    1
                );
            }

            // Update meta keywords.
            if ($keywords !== '') {
                $html = preg_replace(
                    '~<meta\s+name=["\']keywords["\'][^>]*>~i',
                    '<meta name="keywords" content="' .
                    htmlspecialchars(
                        $keywords,
                        ENT_QUOTES | ENT_SUBSTITUTE,
                        'UTF-8'
                    ) .
                    '">',
                    $html,
                    1
                );
            }

            // Validate canonical URL.
            $host = parse_url($canonical, PHP_URL_HOST);

            if (
                !in_array(
                    $host,
                    ['www.steelcraftprefab.com', 'steelcraftprefab.com'],
                    true
                )
            ) {
                $canonical = $route['canonical'];
            }

            $canonicalTag = '<link rel="canonical" href="' .
                htmlspecialchars(
                    $canonical,
                    ENT_QUOTES | ENT_SUBSTITUTE,
                    'UTF-8'
                ) .
                '">';

            // Replace or insert canonical URL.
            if (preg_match(
                '~<link\s+rel=["\']canonical["\'][^>]*>~i',
                $html
            )) {
                $html = preg_replace(
                    '~<link\s+rel=["\']canonical["\'][^>]*>~i',
                    $canonicalTag,
                    $html,
                    1
                );
            } else {
                $html = preg_replace(
                    '~</head>~i',
                    $canonicalTag . "\n</head>",
                    $html,
                    1
                );
            }

            // Apply saved alt text to images without an existing alt attribute.
            // Existing alt attributes are preserved.
            if ($altText !== '') {
                $safeAltText = htmlspecialchars(
                    $altText,
                    ENT_QUOTES | ENT_SUBSTITUTE,
                    'UTF-8'
                );

                $html = preg_replace(
                    '~<img\b(?![^>]*\balt\s*=)([^>]*)>~i',
                    '<img alt="' . $safeAltText . '"$1>',
                    $html
                );
            }

            break;
        }
    }
}

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

echo $html;
