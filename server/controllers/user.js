import User from "../models/userInfo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
const isSafe = (pwd) => {
  if (pwd.length < 6) return 0;
  if (!/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd)) return 0;
  return true;
};

export const signup = async (req, resp, next) => {
  try {
    // const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
      const newUser = await User.create({
        username: req.body.username,
        password: hash,
      });
    } catch (error) {
      return resp.status(400).json({ error: "User Already exist" });
    }
    const user = await User.findOne({ username: req.body.username });
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    resp
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .status(201)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, resp, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return resp.status(404).json({ error: "User not found" });
    } else {
      const isCorrect = await bcrypt.compare(req.body.password, user.password);

      if (!isCorrect)
        return resp.status(400).json({ error: "Wrong Credentials!" });
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;

      if (user && isCorrect) {
        resp
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
          })
          .status(200)
          .json(others);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, resp, next) => {
  try {
    resp.clearCookie("access_token");
    resp.send("Logged out successfully");
  } catch (err) {
    next(err);
  }
};
