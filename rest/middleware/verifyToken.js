const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authToken = req.headers.token;
    if(authToken){
        const token = authToken.split(" ")[1];
         jwt.verify(token,process.env.JWT_SEC,  (err, user) => {
             if(err) res.status(403).send({message: "Token is invalid"});
             req.user = user; 
             next();
         })
    }else{
        res.status(401).send({message: 'You are not authorized to access this'});
    }
};



const verifyTokenAndAuthorization = (req, res,next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id = req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).send({message: 'You are not authorized'})
        }
    })
};


const verifyTokenAndAdmin = (req, res,next) =>{

    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).send({message: 'You are not authorized'});
        }
    })
}
module.exports = verifyToken;
module.exports = verifyTokenAndAuthorization;
module.exports = verifyTokenAndAdmin;