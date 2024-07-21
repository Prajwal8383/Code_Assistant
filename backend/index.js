const express = require('express');
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
const codeRoutes=require("./routes/codeRoutes.js");
const authRoutes=require("./routes/authRoutes");
const saveRoutes=require("./routes/saveRoutes.js")
const cors = require('cors');

const { ESLint } = require('eslint');
const connectToDB = require('./db');
const { setupModel } = require('./setupModel');
const router = express.Router();

dotenv.config();

const app = express();
app.use(cors({
  origin:"*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/code",codeRoutes);
app.use("/api/v1/",saveRoutes);

app.listen(5000, () => {
    setupModel();
    try{
      connectToDB();
      console.log("Connected to db");
    } catch(err){
      console.log(err);
    }
    
  console.log('Server running on port 5000');
});


