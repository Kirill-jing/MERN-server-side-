const User = require('../models/User')
const {validationResult} = require('express-validator')

exports.signup=(req,res,next)=>{
    let name=req.body.name
    let email=req.body.email
    let password = req.body.password
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:'validation failed',
            errors:errors.array()
        })
    }

}