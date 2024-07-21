const { GoogleGenerativeAI } = require("@google/generative-ai");

var genAI;
const setupModel=()=>{
    try{
        genAI = new GoogleGenerativeAI("AIzaSyDtUetUHqMG5mgHqHwbfh9t9sSsLWe0wX8");
    } catch(e){
        console.log("error in genai",e);
    }
}

module.exports={
    setupModel,
    genAI
}