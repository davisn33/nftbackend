const express = require("express");
const router = new express.Router();
var path = require('path')
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });

const { verifyAccessToken, } = require("../configuration/Tokens/webtoken");

const {
  register,getprofile,setCover,setprofile
} = require("../controllers/userController");

router.get("/", verifyAccessToken, (req, res, next) => {
  console.log(req.headers["authorization"]);
  res.send("routing works");
});

router.post("/register", register);

router.post("/setprofile",upload.fields([{
  name: 'profile', maxCount: 1
}]),setprofile );

router.post("/getprofile", getprofile);

router.post("/setcover",upload.fields([{
  name: 'cover', maxCount: 1
}]), setCover);

module.exports = router;
