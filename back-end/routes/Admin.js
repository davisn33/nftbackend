const express = require("express");
const router = new express.Router();
const { verifyAccessToken } = require("../configuration/Tokens/webtoken");
const {  getUsers,getUser } = require("../controllers/adminController");

router.post("/getusers", getUsers);
router.post("/getuser", getUser);

module.exports = router;
