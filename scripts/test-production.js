const https = require('https');

const baseUrl = 'https://guac-and-roll-ashen.vercel.app';
const routes = [
  '/',
  '/menu',
  '/about',
  '/gallery',
  '/visit',
  '/sitemap.xml',
  '/robots.txt',
  '/icon.svg',
  '/apple-icon.png',
  '/favicon.ico',
  '/images/cafe/facade-exterior.png',
  '/images/cafe/interior-arches.png',
  '/images/food/tacos-drink-table.png',
  '/images/brand/logo-neon.jpg'
];

async function testRoute(route) {
  return new Promise((resolve) => {
    https.get(baseUrl + route, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const canonicalMatch = data.match(/<link[^>]+rel="canonical"[^>]*>/i);
        const jsonLdMatch = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
        resolve({
          route,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length,
          canonical: canonicalMatch ? canonicalMatch[0] : null,
          hasJsonLd: Boolean(jsonLdMatch),
          containsTodo: data.includes('TODO_')
        });
      });
    }).on('error', err => resolve({ route, error: err.message }));
  });
}

(async () => {
  console.log('Testing live production at:', baseUrl);
  for (const r of routes) {
    const res = await testRoute(r);
    console.log(JSON.stringify(res, null, 2));
  }
})();
