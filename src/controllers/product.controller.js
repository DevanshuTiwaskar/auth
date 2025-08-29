const userModel = require('../models/user.model') 
const storageService = require('../services/storage.services')
const productModel = require('../models/product.model')


const createProduct = async(req,res)=>{
       
const price = req.body.price ? JSON.parse(req.body.price) : null;

const seller = req.seller;

const { title, description, stock} = req.body


const file = await Promise.all(req.file.map(async (file)=>{
   
   return await storageService.uploadFile(file.buffer)
}))

const product = await productModel.create({
    title:title,
    decription: description,
    price:{
        amount: price?.amount,
        currency: price?.amount || "INR"
    },
    image: file.map(i => i.url),
    seller: seller._id,
    stock: parseInt(stock)
})


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

    req.status(200).json({
        message: "seller product fetched successfully",
        product
    })
}



module.exports = {
    createProduct,
    getAllProduct
}

