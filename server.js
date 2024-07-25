const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

// Serve static files (HTML, CSS, JS)
const serveStaticFile = (res, filePath, contentType, responseCode = 200) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// Handle POST request to save user data
const handlePostRequest = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedData = parse(body);
        const userDataPath = users.JSON(__dirname, 'data', 'users.json');

        // Ensure data directory exists
        if (!fs.existsSync(users.JSON(__dirname, 'data'))) {
            fs.mkdirSync(path.join(__dirname, 'data'));
        }

        // Save user data to the JSON file
        fs.readFile(userDataPath, (err, data) => {
            let users = [];
            if (!err && data.length > 0) {
                users = JSON.parse(data);
            }
            users.push(parsedData);

            fs.writeFile(userDataPath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 - Internal Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('User registered successfully');
                }
            });
        });
    });
};

// Handle download request
const handleDownloadRequest = (res) => {
    const userDataPath = users.JSON(__dirname, 'data', 'users.json');

    fs.readFile(data, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(200, { 
                'Content-Type': 'application/json', 
                'Content-Disposition': 'attachment; filename="users.json"' 
            });
            res.end(data);
        }
    });
};

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            serveStaticFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
        } else if (req.url.endsWith('.css')) {
            serveStaticFile(res, path.join(__dirname, 'public', req.url), 'text/css');
        } else if (req.url.endsWith('.js')) {
            serveStaticFile(res, path.join(__dirname, 'public', req.url), 'application/javascript');
        } else if (req.url.endsWith('.png')) {
            serveStaticFile(res, path.join(__dirname, 'public', req.url), 'image/png');
        } else if (req.url === '/download') { // Handle download request
            handleDownloadRequest(res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/register') {
        handlePostRequest(req, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('405 - Method Not Allowed');
    }
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
