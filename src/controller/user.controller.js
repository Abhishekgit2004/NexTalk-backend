import { asynchandler } from "../utiles/asynchanderler.js";
import { ApiError } from "../utiles/ApiError.js";
import { user } from "../models/user.models.js";
import cloudinaryUploadFile from "../utiles/cloudinary.js";

import { Apiresponse } from "../utiles/Apiresponse.js";
import jwt from "jsonwebtoken";

const register = asynchandler(async (req, res, next) => {
  const { fullName, username, password,  gender } = req.body;
  const avatar=req.files;

  if (!fullName || !username || !gender || !password || !avatar) {
    throw new ApiError(400, "all fields are rquired");
  }

  const existedUser=await user.findOne({
    $or:[{username:username}]
  })
  if(existedUser){
    throw new ApiError(409,"username already exists")
  }

  const avatarLocationPath = req.files?.avatar?.[0]?.path;

  const avatars = await cloudinaryUploadFile(avatarLocationPath);

  const usersa = await user.create({
    fullName,
    username,
    password,
    avatar:avatars.url,
    gender,
  });
  // console.log(fullName,username,password,avatar,gender)

  const tokendata = {
    _id: usersa._id,
  };
  const token = jwt.sign(tokendata, process.env.JWT_SECRATE, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json(
      new Apiresponse(
        200,
        { user: usersa, token },
        "User successfully registered"
      )
    );
});

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "username or password undefined");
  }

  const users = await user.findOne({ username });

  if (!users) {
    throw new ApiError(404, "user not found");
  }

  const isvalidpass = await users.ispasswordcorrect(password);
  if (!isvalidpass) {
    throw new ApiError(404, "password incorrect");
  }
  const loginUser = await user.findById(users._id);
  const tokendata = {
    _id: users._id,
  };
  const token = jwt.sign(tokendata, process.env.JWT_SECRATE, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure:true,
      sameSite: "None",
    })
    .json(new Apiresponse(200,{user: loginUser},"login successfully"));
};

const getProfile = asynchandler(async (req, res) => {
  const userid = req.user._id;
  // console.log(userid);
  // console.log("ab")
  const User =await user.findById(userid);
  res
    .status(200)
    .json(new Apiresponse(200, {User}, "successfully fetched profile"));
});
const Logout = asynchandler(async (req, res) => {
  res
    .status(200)
    .cookie("token", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure:true,
    })
    .json(new Apiresponse(200, {}, "loginout succussfully"));
});

const getOtherUser = asynchandler(async (req,res) => {
  const otheruser =await user.find({ _id: { $ne: req.user._id } });
  res.status(200)
  .json(new Apiresponse(200,otheruser))
});

export { Login, register, getProfile, Logout,getOtherUser };
