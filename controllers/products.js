const Product = require('../models/Product')
const url = require('url');
const User=require('../models/User')

exports.postProduct =(req,res,next)=>{
    const price =req.body.price
    const name =req.body.name
    const description = req.body.description
    const image = req.file.path
    let creator;
  
    let prod = new Product({
        price:price,
        description:description,
        image:image,
        name:name,
        creator:req.userId
    })
    prod.save().then(result=>{
       return User.findById(req.userId)})
       .then(user=>{
           creator=user
           user.products.push(prod)
           return user.save()
   }).then( result=>{
       res.status(201).json({prod:prod,creator:{_id:creator._id,name:creator.name}}).catch(err=> console.log(err))})
  }
    

exports.getProduct = (req,res,next)=>{
    Product.find().then(result=>{
        res.json({product:result})
    })
}

exports.productDetail=(req,res,next)=>{
    let prodId = req.params.productId
    Product.findById(prodId).then(result=>{
        res.json({prod:result})
    })}

exports.deleteProduct=(req,res,next)=>{
let prodId = req.params.prodId
Product.findByIdAndRemove(prodId).then(res=>{
  console.log(res)
})
    }

exports.postEditProduct=(req,res,next)=>{

    let id=req.params.prodId
    const name = req.body.name
    const price = req.body.price
    const image = req.file.path
    const description = req.body.description

   Product.findByIdAndUpdate(id,{name:name,price:price,image:image,description:description})
   .then(res=>console.log(res))
    
   }
   exports.productPrep=(req,res,next)=>{
    let prodId = req.params.productId
    Product.findById(prodId).then(result=>{
        res.json({prod:result})
    })}
