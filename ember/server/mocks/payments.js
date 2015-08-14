module.exports = function(app) {
  var express = require('express');
  var paymentsRouter = express.Router();

  paymentsRouter.get('/', function(req, res) {
    res.send({
      'payments': [
        {
          id: 1,
          description: 'Test Payment 1',
          amount: 40,
          trip_id: 2
        },
        {
          id: 2,
          description: 'Test Payment 2',
          amount: 50,
          trip_id: 2
        },
        {
          id: 3,
          description: 'Test Payment 3',
          amount: 30,
          trip_id: 2
        }
      ]
    });
  });

  app.use('/api/payments', paymentsRouter);
};
