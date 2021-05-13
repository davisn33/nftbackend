const userModel = require("../models/userModel");

module.exports = {

  getUsers: async (req, res, next) => {
    const users = await userModel.find(
      {},
      { name: 1, email: 1, bio: 1, profile_img: 1, cover_img: 1, address: 1 }
    );
    return res.send(users);
  },
  getUser: async (req, res, next) => {
    console.log(req.body.address)
    const user = await userModel.findOne(
      {address:req.body.address},
      { name: 1, email: 1, bio: 1, profile_img: 1, cover_img: 1, address: 1 }
    );
    return res.send(user);
  },
}