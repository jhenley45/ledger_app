module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  usersRouter.post('/sign_in', function(req, res) {
    res.send({
        token: 'myRand0mt0kin',
        user_id: 4
    });
  });

  usersRouter.delete('/sign_out', function(req, res) {
    res.send({
        message: 'logged out'
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.send({});
  });

  app.use('/users', usersRouter);
};
