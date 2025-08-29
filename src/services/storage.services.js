
var ImageKit = require("imagekit");
const utils = require('../utils/utils')

var imagekit = new ImageKit({
    publicKey : "public_f54V6RHi5HlkThZrRXS3d79jfTE=",
    privateKey : "private_/WMQ7rOF3GeNrg9Xkqq2wtNinOE=",
    urlEndpoint : "https://ik.imagekit.io/obavnjjrn"
});



async  function uploadFile(file){
     
    const result = await imagekit.upload({
        file:file,
        fileName:utils.createId(),
        folder: "products_Images"
    })



}


module.exports = {uploadFile}