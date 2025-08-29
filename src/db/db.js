const mongoose = require("mongoose");

const connectdb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("database is connect");
    })
    .catch(() => {
      console.log("error in database", error);
    });
};

module.exports = connectdb;
