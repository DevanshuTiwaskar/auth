const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const productController = require("../controllers/product.controller")
const multer = require("multer")
const router = express.Router()


const upload = multer({ storage: multer.memoryStorage()})

router.post('/',
    authMiddleware.authSeller,
    upload.array("image",5),
    productController.createProduct
)


router.get('/seller',
    authMiddleware.authSeller,
    productController.getAllProduct
)


module.exports = router
