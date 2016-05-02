const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
const bodyParser = require('body-parser').json();
const trailRouter = module.exports = new Router();
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const errorHandler = require(__dirname + '/../lib/db_error_handler');

trailRouter.get('/', (req, res) => {
  res.status(200).json({ msg: 'Yo de le he hoo!' });
});

trailRouter.get('/trails', jwtAuth, (req, res) => {
  Trail.find({ userId: req.user._id }, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

trailRouter.post('/trails', jwtAuth, bodyParser, (req, res) => {
  var newTrail = new Trail(req.body);
  newTrail.userId = req.user._id;
  newTrail.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

trailRouter.put('/trails/:id', bodyParser, (req, res) => {
  var trailData = req.body;
  delete trailData._id;
  Trail.update({ _id: req.params.id }, trailData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'You have changed trail information' });
  });
});

trailRouter.delete('/trails/:id', (req, res) => {
  Trail.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'Trail Deleted' });
  });
});
