import axios from 'axios';

export const handleComplete = async (code, setOutput, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/complete', { code });
    setOutput(response.data.text);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

export const handleExplain = async (code, setOutput, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/explain', { code });
    setOutput(response.data.text);
  } catch (error) {
    console.error(error);
  }
  setLoading(false);
};

export const handleBeautify = async (code, setOutput, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/beautify', { code, language: 'javascript' });
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
