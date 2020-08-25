const User = require('../models/User')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.signup=(req,res,next)=>{
    let name=req.body.name
    let email=req.body.email
    let password = req.body.password
    // const errors= validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(422).json({
    //         message:'validation failed',
    //         errors:errors.array()
    //     })
    // }
    bcrypt.hash(password,12).then(hashedPw=>{
        const user =new User({
            email:email,
            name:name,
            password:hashedPw
        })
        return user.save()
    }).then(result=>{
        res.status(201).json({message:'user created',userId:result._id})
    })
    .catch(err=>console.log(err))

}

exports.login=(req,res,next)=>{
    const email=req.body.email
    const password = req.body.password
    let loadedUser;
    User.findOne({email:email}).then(user=>{
        if(!user){
            res.status(401).json({
                message:'no user found'
            })
        }
        loadedUser=user
      return  bcrypt.compare(password,user.password)
    }).then(isEqual=>{
        if(!isEqual){
            res.status(401).json({
                message:'wrong password'
            })
        }
        const token= jwt.sign({email:loadedUser.email,id:loadedUser._id.toString()},'secret',{expiresIn:'1h'})
        res.status(200).json({
            token:token,id:loadedUser._id.toString()
        })
    })
.catch(err=>console.log(err))
}