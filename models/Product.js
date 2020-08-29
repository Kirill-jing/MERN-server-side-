const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },

    creator: { type: Schema.Types.ObjectId,required:true, ref: 'User'}
      

})

module.exports = mongoose.model('Product',productSchema)