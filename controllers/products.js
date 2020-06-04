const Product = require('../models/Product')

exports.postProduct = (req,res,next)=>{
    
   const name = req.body.name
   const price = req.body.price
   const image = req.body.image
   const description = req.body.description

   let product = new Product({
       name:name,
       price:price,
       description:description,
       image:image
   })
   product.save().then(result=>{
    res.status(201).json({product:result})
   }).catch(err=>{
       console.log(err)
   })


}

exports.getProduct=(req,res,next)=>{
    Product.find().then(result=>{
        res.json({product:result})
    })
}