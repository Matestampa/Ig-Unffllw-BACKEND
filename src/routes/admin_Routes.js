const express=require("express");
const router=express.Router();

const Controller=require("../controllers/admin_Controller.js");

router.get("/get_accounts",Controller.get_accounts);

router.post("/save_account",Controller.save_account);



module.exports=router;