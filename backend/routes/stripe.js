const express = require('express');

const {stripeCheckout,getSession} = require('../controller/stripeController');

const stripeRouter = express.Router();

stripeRouter.post('/checkout',stripeCheckout);
stripeRouter.get('/checkout-session/:session_id',getSession);

module.exports = stripeRouter;