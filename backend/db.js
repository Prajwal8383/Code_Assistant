const mongoose = require('mongoose');


const connectToDB=()=>{

mongoose.connect('mongodb+srv://rootuser:Rayan%401805@codeassistantdb.xmtawxn.mongodb.net/')
}

module.exports=connectToDB;


