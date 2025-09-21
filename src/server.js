const http = require('http');
const pageResponse = require('./pageResponse.js');
const responses = require('./responseHandler.js');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': pageResponse.getIndex,
  '/style.css': pageResponse.getCss,
  '/badRequest': responses.badRequest,
  '/unauthorized': responses.unauthorized,
  '/success': responses.success,
  '/forbidden': responses.forbidden,
  '/internal': responses.internal,
  '/notImplemented': responses.notImplemented,
};

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

  if (request.headers.accept) request.acceptedTypes = request.headers.accept.split(',');
  request.query = Object.fromEntries(parsedURL.searchParams);

  if (urlStruct[parsedURL.pathname]) urlStruct[parsedURL.pathname](request, response);
  else responses.notFound(request, response);
};

http.createServer(onRequest).listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
