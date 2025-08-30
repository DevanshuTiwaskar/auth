const userModel = require('../models/user.model') 
const storageService = require('../services/storage.services')
const productModel = require('../models/product.model')


const createProduct = async(req,res)=>{
       
const price = req.body.price ? JSON.parse(req.body.price) : null;

const seller = req.seller;

const { title, description, stock} = req.body

const files = await Promise.all(
  req.files.map(async (file) => {
    return await storageService.uploadFile(file.buffer);
  })
);
console.log(files)
const product = await productModel.create({
  title,
  description,
  price: {
    amount: price?.amount,
    currency: price?.currency || "INR"
  },
  image: files.map(i => i.url),
  seller: seller._id,
  stock: parseInt(stock) || 0
});



res.status(201).json({
    message: "product create successfully",
    product
})


}

const getAllProduct = async(req,res) => {
    const seller = req.seller

    const product = await productModel.findOne({
        seller: seller._id
    })

    res.status(200).json({
        message: "seller product fetched successfully",
        product
    })
}



module.exports = {
    createProduct,
    getAllProduct
}

