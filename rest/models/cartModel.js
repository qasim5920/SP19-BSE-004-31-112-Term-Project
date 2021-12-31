const mongoose  =  require('mongoose');
const joi  =  require('@hapi/joi');

const cartModel =  mongoose.Schema({
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true });


  const validateCart = (data) => {
      const Schema = joi.object({
         
      })
  }

  const cart =  mongoose.model('Cart' , cartModel);
  module.exports.Cart = cart;
