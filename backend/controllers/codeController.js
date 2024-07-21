const { GoogleGenerativeAI } = require("@google/generative-ai");

const prettier = require('prettier');
const { ESLint } = require('eslint');

const codeComplete=async ( req,res )=>{
  const genAI=new GoogleGenerativeAI("AIzaSyDtUetUHqMG5mgHqHwbfh9t9sSsLWe0wX8");
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
}

const codeExplain=async (req,res)=>{
  const genAI=new GoogleGenerativeAI("AIzaSyDtUetUHqMG5mgHqHwbfh9t9sSsLWe0wX8");

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
}

const codeBeautify=async(req,res)=>{
  const genAI=new GoogleGenerativeAI("AIzaSyDtUetUHqMG5mgHqHwbfh9t9sSsLWe0wX8");

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
}

const codeOutput=async(req,res)=>{
  const genAI=new GoogleGenerativeAI("AIzaSyDtUetUHqMG5mgHqHwbfh9t9sSsLWe0wX8");

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
}

module.exports={
    codeExplain,
    codeBeautify,
    codeOutput,
    codeComplete

}