const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const userCreate = async ({
  userName,
  email,
  password,
  fullName: { firstName, lastName },
  role = "user",
}) => {
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { userName }],
  });

  if (isUserAlreadyExists) {
    throw new Error("user already existed");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    email,
    fullName: {
      firstName,
      lastName,
    },
    password: hash,
    role: role,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  return { token, user };
};

const registerUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      fullName: { firstName, lastName },
    } = req.body; ///// data come from req.body

    const { user, token } = await userCreate({
      ///create user using userCreate function
      userName,
      email,
      fullName: {
        firstName,
        lastName,
      },
      password,
    });

    res.cookie("token", token); ///save the token
    res.status(201).json({
      ///sent the token
      Message: "user register successfully",
      user: {
        userName: user.userName,
        fullName: user.fullName,
        _id: user._id,
        eamil: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password, userName } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ email }, { userName }],
    })
    .select("+password"); ///why we use select method because in userModel we use select:false

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
    },
  });
};

const registerSeller = async (req, res) => {
  const {
    userName,
    email,
    password,
    fullName: { firstName, lastName },
  } = req.body;

  try {
    const { user: seller, token } = await userCreate({
      userName,
      email,
      fullName: {
        firstName,
        lastName,
      },
      password,
      role: "seller",
    });

    res.cookie("token", token);
    res.status(201).json({
      message: "seller register successfully",
      user: {
        userName: seller.userName,
        fullName: seller.fullName,
        _id: seller._id,
        email: seller.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, registerSeller };
