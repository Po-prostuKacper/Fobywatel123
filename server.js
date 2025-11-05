const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const base = process.cwd();

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wasm': 'application/wasm'
  }[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    // SPA support: if path has no extension, serve index.html
    if (!path.basename(urlPath).includes('.')) {
      urlPath = '/index.html';
    }
    const filePath = path.join(base, urlPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, {'Content-Type': contentType(filePath)});
      fs.createReadStream(filePath).pipe(res);
    } else {
      // fallback to index.html for SPA routes
      const idx = path.join(base, 'index.html');
      if (fs.existsSync(idx)) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        fs.createReadStream(idx).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    }
  } catch (e) {
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log('Static server listening on', port);
});