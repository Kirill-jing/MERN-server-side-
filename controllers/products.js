const Product = require('../models/Product')




exports.postProduct = (req,res,next)=>{
    
   const name = req.body.name
   const price = req.body.price
   const image = req.file.path
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

exports.productDetail=(req,res,next)=>{
   let prodId= req.params.productId
   Product.findById(prodId).then(result=>{
       res.json({prod:result})
   })
}

exports.getEditProduct=(req,res,next)=>{
    let editing= req.query.edit
    if(editing){
let prodId = req.params.prodId
Product.findById(prodId).then(result=>{
    res.json({prod:result})
})}
}

exports.postEditProduct=(req,res,nex)=>{
let id = req.params.prodId
const name = req.body.name
const price = req.body.price
// const image = req.body.image
const description = req.body.description

Product.findById(id).then(product=>{
  product.description=description
  product.name=name,
  product.price=price,
  product.image=image
return product.save()

})

}
