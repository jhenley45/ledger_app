module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  // usersRouter.get('/', function(req, res) {
  //   res.send({
  //     'payments': [
  //       {
  //         id: 1,
  //         description: 'Test Payment 1',
  //         amount: 40,
  //         trip_id: 2
  //       },
  //       {
  //         id: 2,
  //         description: 'Test Payment 2',
  //         amount: 50,
  //         trip_id: 2
  //       },
  //       {
  //         id: 3,
  //         description: 'Test Payment 3',
  //         amount: 30,
  //         trip_id: 2
  //       }
  //     ]
  //   });
  // });

  usersRouter.post('/', function(req, res) {
    res.send({
      'user': {
        id: 4,
        email: 'jack@aol.com',
        isVenmoAuthorized: false
      }
    });
  });

  usersRouter.get('/4', function(req, res) {
    res.send({
      'users': {
        id: 4,
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.send({});
  });

  app.use('/api/users', usersRouter);
};
