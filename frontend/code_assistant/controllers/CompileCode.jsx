import axios from 'axios';

export const handleCompile = async (code,input, setOutput, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/output', { code,input });
    setOutput(response.data.text);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

export const handleClear=async (setCode,setInput)=>{
    setCode('');
    setInput('');
};