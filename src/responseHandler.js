const respond = (request, response, status, object) => {
  let content = JSON.stringify(object);
  let type = 'application/json';

  if (request.acceptedTypes && request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += `<message>${object.message}</message>`;
    if (object.id) responseXML += `<id>${object.id}</id>`;
    responseXML += '</response>';
    content = responseXML;
    type = 'text/xml';
  }

  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respond(request, response, 200, responseJSON);
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!request.query.valid || request.query.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, responseJSON);
  }
  return respond(request, response, 200, responseJSON);
};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    responseJSON.id = 'unauthorized';

    return respond(request, response, 401, responseJSON);
  }

  return respond(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  return respond(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  return respond(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  return respond(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON);
};

module.exports = {
  success, badRequest, unauthorized, notFound, forbidden, internal, notImplemented,
};
