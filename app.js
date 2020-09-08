  const express= require('express')
  const bodyParser = require('body-parser')
  const mongoose = require('mongoose')
  const userRoutes = require('./routes/user-route')
  const authRoutes = require('./routes/aurh')
  const app = express()
  const multer = require('multer')
  const path = require('path')
const { ok } = require('assert')
require('dotenv/config')

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,PUT');
    next();
  })

  const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'images')
    },
    filename:(req,file,cb)=>{
      cb(null, file.originalname)
    }
  })
  const fileFilter=(req,file,cb)=>{
   if(file.mimetype ==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
     cb(null,true)
   }else{
     cb(null,false)
   }
  }


app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))

app.use('/user',userRoutes)
app.use('/auth',authRoutes)

  mongoose
  .connect(
    process.env.DB_CONNECTION,
    { 
      useCreateIndex: true,
    useNewUrlParser: true 
    ,useUnifiedTopology: true}
  )
  .then(()=> {
   app.listen(5003) 
  console.log('connect')
})
  .catch(err=>
    {console.log(err)}
    )