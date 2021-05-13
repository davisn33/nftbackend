const userModel = require("../models/userModel");

const { signAccessToken } = require("../configuration/Tokens/webtoken");
const createError = require("http-errors");
const { use } = require("passport");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, bio, address } = req.body;
      if (!address) {
        throw createError.BadRequest();
      }
      const emailExist = await userModel.findOne({ address });
      if (emailExist) {
        await userModel.update({address},{ name, email, bio,profile_img:!req.files.profile?null:req.files.profile[0].filename})
        const savedUser = await userModel.findOne({ address });
        const accessToken = await signAccessToken(savedUser.id);
        console.log(savedUser)
        res.json({
          status: 1,
          accessToken,
        });
      }
      else{
      const newUser = new userModel({ name, email, bio, profile_img:!req.files.profile?null:req.files.profile[0].filename, address });
      const savedUser = await newUser.save();
      if (!savedUser) {
        throw createError.createError("cannot Register user");
      }
      const accessToken = await signAccessToken(savedUser.id);

      res.json({
        status: 1,
        accessToken,
        message: "successfully registered",
      });
    }
    } catch (error) {
      if (error.isjoi == true) {
        error.status = 422;
      }
      console.log(error);
      next(error);
    }
  },

  getprofile : async(req, res, next)=>{
    try {
      const {address } = req.body;
      console.log(address)
      if (!address) {
        throw createError.BadRequest();
      }
      const emailExist = await userModel.findOne({ address });
      if (emailExist) {
        res.json({
          status: 1,
          user:emailExist,
        });
      }
      else{
      res.json({
        status: 0,
      });
    }
    } catch (error) {
      if (error.isjoi == true) {
        error.status = 422;
      }
      console.log(error);
      next(error);
    }
  },

  setCover : async(req, res, next)=>{
    try {
      const {address } = req.body;
      console.log(req.files)
      if (!address) {
        throw createError.BadRequest();
      }
      const emailExist = await userModel.findOne({ address });
      if (emailExist) {
      await userModel.update({address},{ cover_img:!req.files.cover?null:req.files.cover[0].filename})
      let user=await userModel.findOne({ address });
        res.json({
          status: 1,
          user
        });
      }
      else{
      res.json({
        status: 0,
      });
    }
    } catch (error) {
      if (error.isjoi == true) {
        error.status = 422;
      }
      console.log(error);
      next(error);
    }
  },
}