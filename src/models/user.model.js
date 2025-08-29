const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },

  role:{
    type:String,
    enum:["user","seller"],
    default: "user"
  },
  password: {
    type: String,
    select: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
