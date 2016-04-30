const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
const bodyParser = require('body-parser').json();
const trailRouter = module.exports = new Router();

trailRouter.get('/', (req, res) => {

  res.status(200).json({ msg: 'Howdy Pardner!!' });
});
