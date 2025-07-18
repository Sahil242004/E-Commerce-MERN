import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create a jwt token with id encrypted in it and return the token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// extracts email and password from request body, checks if user exists, validates credentials, and returns a token if successful -> input{ email, password } and output { success, user: { name, email }, token }
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    } else {
      const token = createToken(user._id);
      res.json({
        success: true,
        user: { name: user.name, email: user.email },
        token,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// extracts name,email,password from request body, checks if user already exists, validates email and password, hashes the password, saves the user to the database, and returns a token if successful -> input { name, email, password } and output { success, user: { name, email }, token }
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    // checking user already exists
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and tsrng password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valide email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a valide password of more than 8 characters",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// extracts email and password from request body, checks if admin credentials are correct by comparing it with credentials defiend in .env file for admin, and returns a token if successful -> input { email, password } and output { success, token }
const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export { loginUser, registerUser, adminLogin };
