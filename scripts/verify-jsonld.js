const https = require('https');

https.get('https://guac-and-roll-ashen.vercel.app/', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const m = d.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    if (m) {
      console.log('=== HOMEPAGE JSON-LD ===');
      console.log(JSON.stringify(JSON.parse(m[1]), null, 2));
    }
  });
});
