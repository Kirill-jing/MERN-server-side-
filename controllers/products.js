const Product = require('../models/Product')
const url = require('url');
const User=require('../models/User');
const { use } = require('passport');

exports.postProduct =(req,res,next)=>{
    const price =req.body.price
    const name =req.body.name
    const description = req.body.description
    const amount = req.body.amount
    const priceYourAmount = req.body.priceYourAmount
    const yourAmount = req.body.yourAmount
    const image = req.file.path
    const cap =req.body.cap
    const type=req.body.type
    const power = req.body.power
    let creator;
    let prod = new Product({
        price:price,
        description:description,
        image:image,
        name:name,
        amount:amount,
        yourAmount:yourAmount,
        priceYourAmount:priceYourAmount,
        creator:req.userId,
        cap:cap,
        type:type,
        power:power
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

// exports.AddToCart=(req,res,nex)=>{
//     let id=req.params.prodId
//     Product.findById(id).then(product=>{
//         return User.findById(req.userId).then(user=>{
//             user.cart.push(product)
//             return user.save()
//         })
//     }).then(rep=>console.log(rep))
// }
exports.AddToCart=(req,res,nex)=>{
    const price =req.body.price
    const name =req.body.name
    const description = req.body.description
    const amount = req.body.amount
    const priceYourAmount = req.body.priceYourAmount
    const yourAmount = req.body.yourAmount
    const image = req.body.image
    const cap =req.body.cap
    const type=req.body.type
    const power = req.body.power

    let prod = new Product({
        price:price,
        description:description,
        image:image,
        name:name,
        amount:amount,
        yourAmount:yourAmount,
        priceYourAmount:priceYourAmount,
        creator:req.userId,
        cap:cap,
        type:type,
        power:power   
    })

    User.findById(req.userId).then(result=>{
        result.cart.push(prod)
        return result.save()
    }).then(res=>console.log(res))

}

exports.getCart=(req,res,next)=>{
if(req.userId!==undefined){
    User.findById(req.userId).then(result=>{
     res.json({user:result.cart})
    })}else{
        res.json({message:'unauthorized'})
    }
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
    })}

exports.getAllProduct = (req,res,next)=>{
    if(req.userId!='undefined'||'null'){
    Product.find().then(result=>{
return result.filter((el,i)=>{
return el.creator!=req.userId
})}
    ).then(result=>{
        res.json({product:result})
    })
}else if(req.userId=='undefined'||'null'){
    Product.find().then(result=>{
                res.json({product:result})
            }) 
}}

exports.productDetail=(req,res,next)=>{
    let prodId = req.params.productId
    Product.findById(prodId).then(result=>{
        res.json({prod:result})
    })}

exports.deleteProduct=(req,res,next)=>{
let prodId = req.params.prodId
Product.findByIdAndRemove(prodId).then(res=>{
  console.log(res)
})}

exports.deleteCartProduct=(req,res,next)=>{
    let prodId = req.params.prodId
    User.findById(req.userId).then(user=>{
        console.log(user.cart)
    user.cart.forEach((item,i,arr)=>{
     if(item._id==prodId){
        arr.splice(i,1)
     }
     })
  return user.save()
     
    }).then(res=>{
        console.log(res)
    })
   }

exports.postEditProduct=(req,res,next)=>{
    const name = req.body.name
    const price = req.body.price
    const image = req.file.path
    const amount = req.body.amount
    const priceYourAmount = req.body.priceYourAmount
    const yourAmount = req.body.yourAmount
    const description = req.body.description
    let id=req.params.prodId
    const cap =req.body.cap
    const type=req.body.type
    const power = req.body.power
Product.findById(id).then(result=>{
    if(result.creator!=req.userId){
        return  res.status(401).json({
            message:'no user found'
        })
    }
   Product.findByIdAndUpdate(id,
    {amount:amount,
    name:name,
    cap:cap,
    type:type,
    power:power,
    price:price,
    image:image,
    description:description,
    priceYourAmount:priceYourAmount,
    yourAmount:yourAmount})
    .then(res=>console.log(res))
    })
   }
   exports.productPrep=(req,res,next)=>{
    let prodId = req.params.productId
    Product.findById(prodId).then(result=>{
        res.json({prod:result})
    })}

    exports.searchProduct=(req,res,nex)=>{
        let cap= req.query.cap
        let type = req.query.type
        let power = req.query.power
        console.log(type)
        Product.find({power:power,cap:cap,type:type}).then(result=>{
            console.log(result)
           res.json({prods:result})
        })
    }