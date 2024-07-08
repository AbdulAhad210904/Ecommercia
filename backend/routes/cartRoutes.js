const express = require('express');
const router = express.Router();
const {
  addItemToCart,
  deleteItemFromCart,
  updateItemQuantity,
  getCartItems,
  clearCart
} = require('../controller/cartController');

router.post('/add', addItemToCart);

router.delete('/delete/:itemId', deleteItemFromCart);

router.put('/update/:itemId', updateItemQuantity);

router.post('/getcart', getCartItems);

router.post('/clearcart',clearCart);

module.exports = router;
