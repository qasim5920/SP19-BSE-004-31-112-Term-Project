const {validate} = require('../models/productModel');


const productValidation = (req, res, next) => {
    const {error} =  validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).send({message: error.details[0].message});
    }
    next();
};
module.exports = productValidation;