import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const handleComplete = async (code, setOutput, setLoading) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://localhost:5000/api/v1/code/complete', { code },config);
    setOutput(response.data.text);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

export const handleExplain = async (code, setOutput, setLoading) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://localhost:5000/api/v1/code/explain', { code },config);
    setOutput(response.data.text);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

export const handleBeautify = async (code, setOutput, setLoading) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://localhost:5000/api/v1/code/beautify', { code, language: 'javascript' },config);
    setOutput(response.data.beautifiedCode);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

export const handleCopy = (output, setCode) => {
  setCode(output);
};

export const handleCopytoClipboard = async (output) => {
  try {
    await navigator.clipboard.writeText(output);
  } catch (error) {
    console.error(error);
  }
};

export const handleLogout=async ()=>{
  
  console.log("logout");
  try{
    const response=await axios.post('http://localhost:5000/api/v1/auth/logout');
    console.log(response);
    localStorage.removeItem("token");

    
    }catch(error){
      console.error(error);
  }


}
