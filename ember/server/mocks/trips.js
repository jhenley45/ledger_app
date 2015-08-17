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
        member_ids: [4, 7, 8],
        organizer_id: 4
      },
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
      ],
      'members': [
        {
          id: 4,
          username: 'test_user1',
          trip_id: 2
        },
        {
          id: 7,
          username: 'test_user2',
          trip_id: 2
        },
        {
          id: 8,
          username: 'test_user3',
          trip_id: 2
        }
      ]
    });
  });

  tripsRouter.get('/:id', function(req, res) {
    res.send({
      'trips': {
        id: req.params.id,
        title: "Trip " + req.params.id
      }
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
