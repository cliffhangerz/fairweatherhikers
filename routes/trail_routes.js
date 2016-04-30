const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
const bodyParser = require('body-parser').json();
const trailRouter = module.exports = new Router();
const errorHandler = require(__dirname + '/../lib/db_error_handler');

trailRouter.get('/', (req, res) => {
  res.status(200).json({ msg: 'Howdy Pardner!!' });
});

trailRouter.get('/trail', (req, res) => {
  Trail.find(null, (err, data) => {
    if (err) errorHandler();

    res.status(200).json(data);
  });
});

trailRouter.post('/trail', bodyParser, (req, res) => {
  var newTrail = new Trail(req.body);
  newTrail.save((err, data) => {
    if (err) errorHandler();

    res.status(200).json(data);
  });
});

trailRouter.put('/trail/:id', bodyParser, (req, res) => {
  var trailData = req.body;
  delete trailData._id;
  Trail.update({ _id: req.params.id }, trailData, (err) => {
    if (err) errorHandler();

    res.status(200).json({ msg: 'You have changed trail information' });
  });
});

trailRouter.delete('/trail/:id', (req, res) => {
  Trail.remove({ _id: req.params.id }, (err) => {
    if (err) errorHandler();

    res.status(200).json({ msg: 'Trail Deleted' });
  });
});
