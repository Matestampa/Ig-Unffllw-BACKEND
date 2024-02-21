const express=require("express");
const router=express.Router();

const Controller=require("../controllers/getFollowers_Controller.js");

router.get("/user_info/:username",Controller.user_info);

router.get("/nexts",Controller.next_followers);


module.exports=router;