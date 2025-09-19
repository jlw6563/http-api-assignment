const http = require('http');

const port = process.env.port || process.env.NODE_PORT || 3000;

const urlStruct = {

};

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.acceptedTypes = request.headers.accept.split(',');
  request.query = Object.fromEntries(parsedURL.searchParams);

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response);
  } else {
    // Makes this a 404
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
