const jwt =require('jsonwebtoken')

module.exports=(req,res,next)=>{
    console.log(req.get('Authorization'))
    const  token= req.get('Authorization').split(' ')[1]

    req.userId=token.id

    console.log(req.userId)
    next()
   
}