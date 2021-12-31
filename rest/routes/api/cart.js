const express = require('express');
const router = express.Router();
const productValidation = require('../../middleware/validateProduct');
const {Cart} = require('../../models/cartModel');

router.get('/',async (req, res) => { 
    let carts = await Cart.find();
    res.send(carts);
    console.log("requested");
});

router.get('/:userid',async (req, res) => {
    let id =  req.params.userid;
    let cart  = await Cart.findOne({userid: id});
    res.send(cart);
});


router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.delete("/:id", async function (req, res) {

    try {
    let id = req.params.id;
    let cart = await Cart.findByIdAndDelete(id);
    if(!cart){
      res.status(404).send({message: "This product is not available"});
    }
    return res.send(cart);
    }catch (err) {
     return res.status(404).send({message:"Id is not a valid"});
    }
});

router.post('/',productValidation,async (req, res)=>{

    try{
        let cart = new Cart(req.body);
        await cart.save();
        return res.send(cart);
    }catch(err){
        return res.status(500).send({message:"This product is invalid"});
    }
});

module.exports = router;
