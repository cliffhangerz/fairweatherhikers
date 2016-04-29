const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
var trailRouter = module.exports = Router();
const bodyParser = require('body-parser').json();

trailRouter.get('/', (req, res) => {

  res.status(200).json({ msg: 'Howdy Pardner!!' });
});
