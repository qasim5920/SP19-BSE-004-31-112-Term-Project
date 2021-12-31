const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const productModel = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true},
    inStock: { type: Boolean, default: true },
});

const validateProduct = (data) => {
    const schema = joi.object({
        title: joi.string().min(3).max(30).required(),
        desc: joi.string().min(3).required(),
        price: joi.number().min(1).required(),
    });
    return schema.validate(data,{abortEarly:false});
}


const product = mongoose.model('Product', productModel);
module.exports.Product = product;
module.exports.validate = validateProduct;