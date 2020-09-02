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


exports.AddToCart=(req,res,nex)=>{
    let id=req.params.prodId
    Product.findById(id).then(product=>{
        return User.findById(req.userId).then(user=>{
            user.cart.push(product)
            return user.save()
        })
    }).then(rep=>console.log(rep))
}

exports.getCart=(req,res,next)=>{
    User.findById(req.userId).then(result=>{
     res.json({user:result.cart})
    })
}

exports.getMyProduct = (req,res,next)=>{
   User.findById(req.userId).then(resul=>{
       console.log(resul)
   })
    Product.find().then(result=>{
return result.filter((el,i)=>{
return el.creator==req.userId
})}
    ).then(result=>{
        res.json({product:result})
    })
}

exports.getAllProduct = (req,res,next)=>{
    Product.find().then(result=>{
return result.filter((el,i)=>{
  
return el.creator!=req.userId
})}
    ).then(result=>{
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
    const name = req.body.name
    const price = req.body.price
    const image = req.file.path
    const description = req.body.description
    let id=req.params.prodId
Product.findById(id).then(result=>{
    if(result.creator!=req.userId){
        return  res.status(401).json({
            message:'no user found'
        })
    }
   Product.findByIdAndUpdate(id,{name:name,price:price,image:image,description:description})
    .then(res=>console.log(res))
    })
   }
   exports.productPrep=(req,res,next)=>{
    let prodId = req.params.productId
    Product.findById(prodId).then(result=>{
        res.json({prod:result})
    })}
