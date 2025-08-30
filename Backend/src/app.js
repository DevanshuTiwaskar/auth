const express = require("express")
const cookieParser = require('cookie-parser')
const authRouter = require("./router/auth.routes") 
const productRouter = require('./router/product.routes')


const app = express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)





module.exports = app

