const fs = require('fs');
const path = require('path');

// const getParty = (request, response) => {
//   const file = path.resolve(__dirname, '../client/party.mp4');

//   fs.stat(file, (err, stats) => {
//     if (err) {
//       if (err.code === 'ENOENT') {
//         response.writeHead(404);
//       }
//       response.end(err);
//     }

//     let { range } = request.headers;
//     if (!range) {
//       range = 'bytes=0-';
//     }
//     const positions = range.replace(/bytes=/, '').split('-');

//     let start = parseInt(positions[0], 10);

//     const total = stats.size;
//     const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

//     if (start > end) {
//       start = end - 1;
//     }

//     const chunkSize = (end - start) + 1;

//     response.writeHead(206, {
//       'Content-Range': `bytes ${start}-${end}/${total}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunkSize,
//       'Content-Type': 'video/mp4',
//     });

//     const stream = fs.createReadStream(file, { start, end });
//     stream.on('open', () => stream.pipe(response));
//     stream.on('error', (streamErr) => response.end(streamErr));
//     return stream;
//   });
// };

const loadFile = (request, response, filePath, mediaType) => {
    const file = path.resolve(__dirname, filePath);

    fs.stat(file, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          response.writeHead(404);
        }
        response.end(err);
      }
  
      let { range } = request.headers;
      if (!range) {
        range = 'bytes=0-';
      }
      const positions = range.replace(/bytes=/, '').split('-');
  
      let start = parseInt(positions[0], 10);
  
      const total = stats.size;
      const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
  
      if (start > end) {
        start = end - 1;
      }
  
      const chunkSize = (end - start) + 1;
  
      response.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': mediaType,
      });
  
      const stream = fs.createReadStream(file, { start, end });
      stream.on('open', () => stream.pipe(response));
      stream.on('error', (streamErr) => response.end(streamErr));
      return stream;
    });  
};

// module.exports.getParty = getParty;
module.exports.loadFile = loadFile;