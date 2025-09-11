const express = require("express")
const cookieParser = require('cookie-parser')
const authRouter = require("./router/auth.routes") 
const productRouter = require('./router/product.routes')
const paymentRouter = require("./router/payment.routes.js")
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express()

app.use(express.json())
app.use(cookieParser())


app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/api/payment",paymentRouter)





module.exports = app

