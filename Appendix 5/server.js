//Tran Mai Que Anh GCS220564
const http = require('http');
const server = http.createServer(function(req, res) {
    if (req.url == '/') {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }
    else if (req.url == "/student") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><body><p>This is student Page.</p></body></html>');
        res.end()
    }
    else if (req.url == "/admin") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end()
    }
    else if (req.url == "/data") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: "Hello World JSON"}));
        res.end()
    }
    else
        res.end('Invalid Request!');
});
server.listen(8000);
console.log('Node.js web serverr at port 8000 is runiing..');
