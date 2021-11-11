const fs = require('fs');
const path = require('path');
// const range = "bytes=32324-"


exports.stream = (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
}

exports.videStream = (req, res) =>{
  
  const range = req.headers.range;


  
  const videoPath = path.join(__dirname, '../public/video/video.mp4');
  const videoSize = fs.statSync(path.join(__dirname, '../public/video/video.mp4')).size;


  
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
}