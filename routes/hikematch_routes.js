const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
const bodyParser = require('body-parser').json();
const hikeMatchRouter = module.exports = new Router();
const errorHandler = require(__dirname + '/../lib/db_error_handler');


hikeMatchRouter.get('/hikematch', (req, res) => {
    res.status(200).json({ msg: 'hiking ' });
});
