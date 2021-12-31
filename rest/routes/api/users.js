const { User } = require("../../models/userModel");
const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const verifyTokenAndAuthorization = require("../../middleware/verifyToken");
const {Order} = require("../../models/orderModel")
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = crypto.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    console.log(req.body);
    console.log(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res.status(200).send({ message: "user deleted successfully" });
  } else {
    res.status(500).send({ message: "user is not available" });
  }
});

router.get("/", async (req, res) => {
  let users = await User.find();
  if (users.length == 0) {
    res.status(404).send({ message: "no user found" });
  } else {
    res.status(200).send(users);
  }
});

router.get("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: "This user does not exist" });
  }
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ message: "This user is already registered" });
  } else {
    user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    return res.send(user);
  }
});


router.get('/orderscount/:userid',async (req, res) => {
          try{
          let userId = req.params.userid;
          let orders = await Order.find({userId: userId});
          if(orders.length>0){
            res.status(200).send(orders);
          }else{
            res.status(404).send({message:"Orders are not available"});
          }
          } catch(err){
             res.status(500).send({message:"Error "+err});
          }
});
module.exports = router;
