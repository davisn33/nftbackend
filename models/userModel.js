const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
  },
  bio: {
    type: String,
    default: null,
  },
  profile_img: {
    type: String,
    default: null,
  },
  cover_img: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    unique: true,
    required: true,
  },
});

/* userShema.pre("save", async function (next) {
  try {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();

    // console.log(hashedPassword);
  } catch (error) {
    next(error);
  }
});

userShema.methods.isValidPassword = async function (password, callback) {
  await bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userShema.methods.hashPassword = async function (password, callback) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  callback(hashedPassword);
}; */

const users = mongoose.model("User", userShema);
module.exports = users;
