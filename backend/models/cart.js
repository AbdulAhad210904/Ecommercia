const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  productId: {type: String,required: true},
  title: {type: String,required: true},
  image: {type: String,required: true},
  price: {type: Number,required: true},
  quantity: {type: Number,required: true,min: 1}
});

const CartSchema = new Schema({
  userId: {type: Schema.Types.ObjectId,ref: 'User',required: true},
  items: [CartItemSchema],
  createdAt: {type: Date,default: Date.now},
  updatedAt: {type: Date,default: Date.now}
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
