const express=require("express");

const { codeExplain, codeComplete, codeBeautify, codeOutput } = require("../controllers/codeController.js");
const { authMiddleware } = require("../middleware/middleware.js");
const router=express.Router();

router.post("/complete",authMiddleware,codeComplete);
router.post("/explain",authMiddleware,codeExplain);
router.post("/beautify",authMiddleware,codeBeautify);
router.post("/output",authMiddleware,codeOutput);

module.exports=router