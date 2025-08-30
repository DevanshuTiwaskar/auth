require('dotenv').config()

const app  = require("./src/app")
const connectdb = require('./src/db/db')

connectdb()

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`server is  running on PORT:${PORT}`)
})