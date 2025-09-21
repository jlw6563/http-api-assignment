const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(index, 'utf8'),
  });

  response.write(index);
  response.end();
};

const getCss = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
    'Content-Length': Buffer.byteLength(css, 'utf8'),
  });
  response.write(css);
  response.end();
};
module.exports = { getIndex, getCss };
