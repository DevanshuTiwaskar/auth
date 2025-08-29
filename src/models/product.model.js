const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  decription: {
    type: String,
  },
  image: {
    type: [String],
  },
  price: {
    amount: {
      type: Number,
      require: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "INR"],
      default: "INR",
    },
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
