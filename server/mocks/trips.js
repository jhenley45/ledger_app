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
    res.status(201).end();
  });

  tripsRouter.get('/:id', function(req, res) {
    res.send({
      'trips': {
        id: req.params.id
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
    res.status(204).end();
  });

  app.use('/api/trips', tripsRouter);
};
