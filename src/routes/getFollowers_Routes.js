const express=require("express");
const router=express.Router();

const Controller=require("../controllers/getFollowers_Controller.js");

const Validator=require("../validators/getFollowers_validator.js");


router.get("/user_info/:username",Controller.user_info);

router.post("/nexts",Validator.validate_nextFoll,Controller.next_followers);


module.exports=router;