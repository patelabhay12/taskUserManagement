import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import { JSONStructure } from "../utils/helper.js";

const Login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation Error", errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.json(JSONStructure(StatusCode.unprocessable_entity, "Username or password is incorrect"))
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.json(JSONStructure(StatusCode.unprocessable_entity, "Username or password is incorrect"))
    }

    const token = jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);

    res.json(JSONStructure(StatusCode.success, "Login Successful", { userId: user._id, token: token }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const UserProfile=async (req,res)=>{
  try {
    let user = await User.find({ _id: "66e2fbf41e0136e24b8c9e4d" })
    console.log(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while getting user Profile ..." });
  }
}
export default {
  Login,
  UserProfile
};
