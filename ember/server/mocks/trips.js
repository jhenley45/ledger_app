module.exports = function(app) {
  var express = require('express');
  var tripsRouter = express.Router();

  tripsRouter.get('/', function(req, res) {
    res.send({
      'trips': [
        {
          id: 1,
          title: 'Trip 1'
        },
        {
          id: 2,
          title: 'Trip 2'
        },
        {
          id: 3,
          title: 'Trip 3'
        }
      ]
    });
  });


  tripsRouter.post('/', function(req, res) {
    res.send({
      'trips': {
        id: 4,
        title: "Trip 4"
      }
    });
  });

  tripsRouter.get('/2', function(req, res) {
    res.send({
      'trips': {
        id: 2,
        title: "Trip 2",
        payment_ids: [1, 2, 3],
        user_ids: [4, 7, 8],
        settlement_ids: [1, 2, 3, 4],
        organizer_id: 4
      },
      'payments': [
        {
          id: 1,
          description: 'Test Payment 1',
          amount: 40,
          trip_id: 2,
          user_id: 7
        },
        {
          id: 2,
          description: 'Test Payment 2',
          amount: 50,
          trip_id: 2,
          user_id: 7
        },
        {
          id: 3,
          description: 'Test Payment 3',
          amount: 30,
          trip_id: 2,
          user_id: 4
        }
      ],
      'users': [
        {
          id: 4,
          username: 'test_user1',
          trip_id: 2,
          payment_ids: [3],
          settlement_ids: [1, 2]
        },
        {
          id: 7,
          username: 'test_user2',
          trip_id: 2,
          payment_ids: [1, 2],
          settlement_ids: [3]
        },
        {
          id: 8,
          username: 'test_user3',
          trip_id: 2,
          payment_ids: [],
          settlement_ids: [4]
        }
      ],
      'settlements': [
        {
          id: 1,
          amount: '49.98',
          trip_id: 2,
          payer_id: 4,
          payee_id: 7
        },
        {
          id: 2,
          amount: '43.43',
          trip_id: 2,
          payer_id: 4,
          payee_id: 8
        },
        {
          id: 3,
          amount: '20.65',
          trip_id: 2,
          payer_id: 7,
          payee_id: 8
        },
        {
          id: 4,
          amount: '12.43',
          trip_id: 2,
          payer_id: 8,
          payee_id: 4
        }
      ]
    });
  });

  tripsRouter.get('/:id', function(req, res) {
    res.send({
      'trips': {
        id: req.params.id,
        title: "Trip " + req.params.id,
        user_ids: [4, 7, 8],
        organizer_id: 7
      },
      'users': [
        {
          id: 4,
          username: 'test_user1',
          trip_id: req.params.id
        },
        {
          id: 7,
          username: 'test_user2',
          trip_id: req.params.id
        },
        {
          id: 8,
          username: 'test_user3',
          trip_id: req.params.id
        }
      ]
    });
  });

  tripsRouter.put('/:id', function(req, res) {
    res.send({
      'trips': {
        id: req.params.id
      }
    });
  });

  tripsRouter.delete('/:id', function(req, res) {
    res.send({});
  });

  app.use('/api/trips', tripsRouter);
};
