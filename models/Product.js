const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  cap: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  yourAmount: {
    type: Number,
    required: true,
  },
  priceYourAmount: {
    type: Number,
    required: true,
  },
  creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Product", productSchema);
