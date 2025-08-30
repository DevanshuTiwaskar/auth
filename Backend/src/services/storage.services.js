
var ImageKit = require("imagekit");
const utils = require('../utils/utils')

var imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY,
    urlEndpoint : process.env.URL_ENDPONIT
});



async  function uploadFile(file){
     
    const result = await imagekit.upload({
        file:file,
        fileName:utils.createId(),
        folder: "products_Images"
    })

   return result

}


module.exports = {uploadFile}