module.exports = function(app) {
  var express = require('express');
  var tripUsersRouter = express.Router();

  tripUsersRouter.post('/', function(req, res) {
    res.send({
      'user': {
        id: 5,
        username: 'test_user5',
        trip_id: 2
      }
    });
  });


  app.use('/api/trip_users', tripUsersRouter);
};
