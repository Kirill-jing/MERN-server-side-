  const express= require('express')
  const bodyParser = require('body-parser')
  const mongoose = require('mongoose')
  const userRoutes = require('./routes/user-route')
  const app = express()




  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  })

app.use(bodyParser.json());

app.use('/user',userRoutes)

  mongoose
  .connect(
    'mongodb+srv://prima:5555555555@cluster0-sj8wi.mongodb.net/mern?retryWrites=true&w=majority',
    { 
      useCreateIndex: true,
    useNewUrlParser: true 
    ,useUnifiedTopology: true}
  )
  .then(()=>{app.listen(5003)
    console.log('connect')
})
  .catch(err=>
    {console.log(err)}
    )