const express = require('express');
var cors = require('cors');
const app = express();
const fs = require('fs');
let videopath = '1.mp4';
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/video', function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send('Requires Range header');
    }

    const videoSize = fs.statSync(videopath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
    };
    res.writeHead(206, headers);
    console.log(`playing: `, videopath);
    const videoStream = fs.createReadStream(videopath, { start, end });
    videoStream.pipe(res);
});

app.get('/next', function (req, res) {
    console.log(`Next Video Requested`);
    switch (videopath) {
        case '1.mp4':
            videopath = '2.mp4';
            break;
        case '2.mp4':
            videopath = '3.mp4';
            break;
        case '3.mp4':
            videopath = '1.mp4';
            break;

        default:
            break;
    }
    console.log(`videopath: `, videopath);
    res.sendStatus(200);
});

app.listen(8000, function () {
    console.log('Listening on port 8000!');
});
