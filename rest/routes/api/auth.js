const express = require('express');
const router = express.Router();
const {User} = require('../../models/userModel');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');


router.post('/register',async (req,res) => {
     let user = new User();
     user.username = req.body.username;
     user.email = req.body.email;
     user.password =   crypto.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
     try{
           let saved = await user.save();
           res.status(200).send(saved);
     }catch(err){
           res.status(500).send({message:"Invalid information"+err})
     }
});

router.post('/login',async (req, res) => {

    let user  = await User.findOne({username:req.body.username});
    if(user){
          let hashedPassword  = crypto.AES.decrypt(user.password,process.env.PASS_SEC);
          let password = hashedPassword.toString(crypto.enc.Utf8);
          if(password!==req.body.password){
              res.status(500).send({message:"Password is incorrect"});
                 
           
          }else{
               const access = jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin
            }, 
             process.env.JWT_SEC,
             {expiresIn:"1d"}
            );
            res.status(200).send({user,access});

          }
    }else{
        res.status(500).send({message:"This user is not registered."});
    }
});

module.exports = router;

