import * as personService from './person.service.js';

export default (req, res) => {
  const { url } = req;
  const { method } = req;

  const { pathname } = new URL(`http://localhost:${process.env.PORT}${url}`);

  const [, path, uid = ''] = pathname.split('/');

  const regExpUid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
  const isUidValid = regExpUid.test(uid);

  let result = null;

  if (path === 'person') {
    switch (method) {
      case 'GET':
        if (uid) {
          if (!isUidValid) {
            res.statusCode = 400;
            result = { message: 'Wrong uid' };
          } else {
            result = personService.getUser(uid);
            if (!result) {
              res.statusCode = 404;
              result = { message: 'Person not found' };
            }
          }
        } else {
          result = personService.getUsers();
        }
        res.end(JSON.stringify(result));
        break;
      case 'POST':
        // eslint-disable-next-line no-case-declarations
        const body = [];

        req.on('data', (data) => {
          body.push(data);
        });

        req.on('end', () => {
          const post = JSON.parse(body.join(''));
          result = personService.createPerson(post);
          if (result) {
            res.statusCode = 201;
          } else {
            res.statusCode = 400;
            result = { message: 'Request does not have required field' };
          }
          res.end(JSON.stringify(result));
        });

        break;
      case 'PUT':
        if (uid) {
          if (!isUidValid) {
            res.statusCode = 400;
            result = { message: 'Wrong uid' };
            res.end(JSON.stringify(result));
          } else {
            // eslint-disable-next-line no-shadow
            const body = [];

            req.on('data', (data) => {
              body.push(data);
            });

            req.on('end', () => {
              const post = JSON.parse(body.join(''));
              result = personService.updatePerson(uid, post);
              if (result) {
                res.statusCode = 200;
              } else {
                res.statusCode = 400;
                result = { message: 'Request does not have required field' };
              }
              res.end(JSON.stringify(result));
            });
          }
        } else {
          res.statusCode = 400;
          result = { message: 'Uid id required' };
          res.end(JSON.stringify(result));
        }

        break;
      case 'DELETE':
        if (uid) {
          if (!isUidValid) {
            res.statusCode = 400;
            result = { message: 'Wrong uid' };
          } else {
            result = personService.deletePerson(uid);
            if (!result) {
              res.statusCode = 404;
              result = { message: 'Person not found' };
            } else {
              res.statusCode = 204;
              result = {};
            }
          }
        } else {
          res.statusCode = 400;
          result = { message: 'Uid id required' };
        }
        res.end(JSON.stringify(result));
        break;

      default:
        res.end();
        break;
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }
};
