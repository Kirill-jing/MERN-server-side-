const express =require('express')
const{body} =require('express-validator')
const router =express.Router()
const authController=require('../controllers/user')
const User=require('../models/User')
router.put('/signup',[
    body('email').isEmail()
    .custom((value,{req})=>{
        User.findOne({email:value}).then(user=>{
            if(user){
                return Promise.reject('email already exists')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()
],authController.signup)

module.exports=router