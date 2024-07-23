import axios from 'axios';

export const handleCompile = async (code,input, setOutput, setLoading) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://localhost:5000/api/v1/code/output', { code,input },config);
    setOutput(response.data.text);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

export const handleClear=async (setCode,setInput,setOutput)=>{
    setCode('');
    setInput('');
    setOutput('');
};