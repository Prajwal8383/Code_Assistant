const express=require("express");
const { saveEntry, getEntries, deleteEntry } = require("../controllers/saveControllers");
const { authMiddleware } = require("../middleware/middleware");


const router=express.Router();

router.post("/save",authMiddleware,saveEntry);
router.get("/user/:userId",authMiddleware,getEntries);
router.delete("/delete/:entryId",authMiddleware,deleteEntry);


module.exports=router;
