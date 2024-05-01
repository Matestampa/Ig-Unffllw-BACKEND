const express=require("express");
const router=express.Router();

const {admin_auth}=require("../middlewares/admin.js");
const Controller=require("../controllers/admin_Controller.js");


router.use(admin_auth);

router.get("/get_accounts",Controller.get_accounts);

router.post("/save_account",Controller.save_account);

router.post("/enable_requests",Controller.re_enable_requests);



module.exports=router;