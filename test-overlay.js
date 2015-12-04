var http = require('http'),
    fs = require('fs');

var spawn = require('child_process').spawn;

http.createServer(function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (req.url === '/template.html') {

        res.end(fs.readFileSync('./template.html', 'utf8'));

    } else if (req.url.match(/\/images\/.*/)) {

    	res.end(fs.readFileSync('.' + req.url));
    } else {
        res.end('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>TEST PAGE</title></head><body><iframe id="frame" src="template.html" seamless="yes" scrolling="no" style="border: none;" height="1" width="1"></iframe><p>This is a test page</p></body></html>');
    }


}).listen(3000);

spawn('open', ['http://localhost:3000']);
