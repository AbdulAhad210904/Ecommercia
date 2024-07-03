const express = require('express');
const router = express.Router();
const {
  addItemToCart,
  deleteItemFromCart,
  updateItemQuantity,
  getCartItems
} = require('../controller/cartController');

router.post('/add', addItemToCart);

router.delete('/delete/:itemId', deleteItemFromCart);

router.put('/update/:itemId', updateItemQuantity);

router.get('/getcart', getCartItems);

module.exports = router;
