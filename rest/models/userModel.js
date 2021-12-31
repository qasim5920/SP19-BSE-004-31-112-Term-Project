const mongoose = require('mongoose');
const joi =  require('@hapi/joi');

const userSchema =  mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

const validateUserSignUp =  (data) => {
    const schema = joi.object({
        username: joi.string().min(5).max(20).required(),
        email: joi.email().required(),
        password: joi.string().min(4).max(12).required(),
    });
    return schema.validate(data,{abortEarly:false});
}

const validateUserLogin = (data) =>{
    const schema = joi.object({
        email: joi.email().required(),
        password: joi.string().min(4).required()
    });
    return schema.validate(data,{abortEarly:false});
}

const user = mongoose.model('User', userSchema);

module.exports.User = user; 
module.exports.validateUserLogin = validateUserLogin;
module.exports.validateUserSignUp = validateUserSignUp;