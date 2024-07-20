const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const prettier = require('prettier');
const { ESLint } = require('eslint');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)

const app = express();
app.use(cors());
var genAI;
app.use(bodyParser.json());
app.listen(5000, () => {
    genAI = new GoogleGenerativeAI("AIzaSyDtUetUHqMG5mgHqHwbfh9t9sSsLWe0wX8");
    
  console.log('Server running on port 5000');
});



app.post('/complete', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const { code } = req.body;
  
  try {
    const prompt=`complete the code : ${code}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/explain', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const { code } = req.body;
  try{
    const prompt=`explain the code : ${code}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/beautify', async (req, res) => {
  const { code, language } = req.body;
  console.log(code,language);
  try {
    let formattedCode;
    if (language === 'javascript') {
      formattedCode = await prettier.format(code, { parser: 'babel' });
    } else if (language === 'python') {
      formattedCode = await prettier.format(code, { parser: 'python' });
    } else {
      throw new Error('Unsupported language');
    }
    console.log(formattedCode);
    res.json({ beautifiedCode: formattedCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.post('/debug', async (req, res) => {
//   const { code, language } = req.body;
//   try {
//     const eslint = new ESLint();
//     const results = await eslint.lintText(code);
//     console.log(results);
//     res.json({ debugResults: results });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


app.post('/output',async(req,res)=>{
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const { code, input } = req.body;
  
  try {
    const prompt=`give only the output of this code, no messages : ${code} and with the input(s) : ${input}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})