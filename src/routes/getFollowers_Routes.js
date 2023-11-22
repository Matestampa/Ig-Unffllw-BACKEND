const express=require("express");
const router=express.Router();

const Controller=require("../controllers/getFollowers_Controller.js");

router.get("/:username",Controller.get_followers);


module.exports=router;