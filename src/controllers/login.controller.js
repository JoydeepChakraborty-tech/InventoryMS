const db = require("../models");
const User = db.user;
const jwt   =   require('jsonwebtoken')
const logger = require("../middleware/Log.config")

exports.loginUser = async(req,res) =>{
    try{
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({where:{email}})
        if(!user){
           return res.status(401).send({success : false,error:{reason : 'Invalid Username/Password. Please try again'}})         
        }else if (!await user.validPassword(password)) {
            return  res.status(401).send({success : false,error:{reason : 'Invalid Username/Password. Please try again'}});
       }else{
            const token = await user.generateAuthToken()
            res.send({success:true,data :{token,userName:user.email}});
        }
        
    }catch(err){
        logger.error('Error in Login :'+err)
        res.status(500).send({success:false,data:{reason:err}})
    }
}

exports.logoutUser = async(req,res)=>{
    try{
       res.send({success:true,data: {token:''}})
    }catch(err){
        logger.error('Error in logout :'+err)
        res.status(500).send({success:false,error: {reason : 'Some Error Occurred!' }})
    }
}

