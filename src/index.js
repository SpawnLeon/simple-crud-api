import http from 'http';

import routePerson from './resources/person/person.router.js';

export default (port) => {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset-utf-8');
    try {
      routePerson(req, res);
    } catch (e) {
      res.statusCode = 500;
      const result = {
        message: 'Internal server error',
      };
      res.end(JSON.stringify(result));
    }
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
