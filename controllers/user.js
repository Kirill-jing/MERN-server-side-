const User = require('../models/User')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

exports.signup=(req,res,next)=>{
    let name=req.body.name
    let email=req.body.email
    let password = req.body.password
    let phone =req.body.phone

    bcrypt.hash(password,12).then(hashedPw=>{
        const user =new User({
            email:email,
            name:name,
            phone:phone,
            password:hashedPw
        })
        return user.save()
    }).then(result=>{
        const token= jwt.sign({email:result.email,id:result._id.toString()},'secret',{expiresIn:'1h'})
        res.status(201).json({token:token,userId:result._id})
    })
    .catch(err=>console.log(err))
}

exports.login=(req,res,next)=>{
    const email=req.body.email
    const password = req.body.password
  
    let loadedUser;
    User.findOne({email:email}).then(user=>{
        if(!user){
          return  res.status(401).json({
                message:'no user found'
            })
        }
        loadedUser=user
        console.log(user.password)
        console.log(password)
        
      return  bcrypt.compare(password,user.password
      )

    }).then(isEqual=>{
        console.log(isEqual)
        if(isEqual==false){
         return (  res.status(401).json({
                message:'wrong password'
            }))
        }
        const token= jwt.sign({email:loadedUser.email,id:loadedUser._id.toString()},'secret',{expiresIn:'1h'})
       res.status(200).json({
            token:token,id:loadedUser._id.toString()
        })
    }).catch(err=>console.log(err) 
    )
}

