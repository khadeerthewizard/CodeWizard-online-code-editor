import axios from 'axios';
import ReactLoading from "react-loading";

import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react"
import Navbar from './Navbar.js';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const bapiUrl = 'https://codewizard-online-code-editor.onrender.com';

function App() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [input, setInput] = useState('');
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const textFieldRef = useRef(null);
  
  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      language: language,
      code,
      input,
    };

    try {
      const response = await axios.post(bapiUrl + "/run", payload);
      console.log(response);
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.output) {
        setOutput(error.response.data.output);
      } else {
        setOutput("Errors.. Check your code and connection"); 
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit2 = async () => {
    setLoading(true); 
    const payload = {
      code,
      language,
      type:"Correct"
    };

    try {
      const response = await axios.post(bapiUrl + "/magic", payload);
      console.log(response);
      setCode(response.data.output);
      setOutput("MAgiC DonE");
    } catch (error) {
      console.error("Error:", error); // Use console.error for errors
      if (error.response && error.response.data && error.response.data.output) {
        setOutput(error.response.data.output);
      } else {
        setOutput("Errors.. Check your code and connection"); // More informative error message
      }
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };
  const handleSubmit3 =()=>{
    const payload = {
      code,
      language,
      type:"Auto"
    };
    console.log(code);
    try {
      axios.post(bapiUrl+"/magic",payload)
    .then((response) => {
      console.log(response);
      setCode(response.data.output);
      setOutput("Auto Completed the code")
    })
    .catch((error) => {
      console.log("checkpoint");
      console.log(error.response.data.output);
      setOutput("Errors.. Check your code");
    });
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit4 =()=>{
    const payload = {
      code,
      language,
      type:"Optimize"
    };
    console.log(code);
    try {
      axios.post(bapiUrl+"/magic",payload)
    .then((response) => {
      console.log(response);
      setCode(response.data.output);
      setOutput("Optimized");
    })
    .catch((error) => {
      console.log("checkpoint");
      console.log(error.response.data.output);
      setOutput("Errors.. Check your code");
    });
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit5 =()=>{
    const payload = {
      code,
      language,
      type:"guide_me"
    };
    console.log(code);
    try {
      axios.post(bapiUrl+"/magic",payload)
    .then((response) => {
      console.log(response);
      setCode(response.data.output);
      setOutput("Added comments")
    })
    .catch((error) => {
      console.log("checkpoint");
      console.log(error.response.data.output);
      setOutput("Errors.. Check your code");
    });
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (isTextFieldFocused) {
      textFieldRef.current.focus();
    }
  }, [isTextFieldFocused]);
  return (
    <div className="App">
    {loading ? <div className="loading-overlay">
          <ReactLoading type="spin" color="#0000FF" height={100} width={100} />
        </div>
    : 
      <>
      <h2>Code Wizard</h2>
      <Navbar
        language={language} setLanguage={setLanguage}
        theme={theme} setTheme={setTheme}
      />

      <div id='editor'>
      <Editor
        width="100%"
        height="300px"
        language={language}
        theme={theme}
        
        value={code}
        onChange={setCode}
      />
      </div>
      <div id='run'>
        <Button onClick={handleSubmit} variant="contained" color="success">Run</Button>

        <Button onClick={handleSubmit2} variant='contained' color='success'>Magic</Button>
        <Button onClick={handleSubmit3} variant='contained' color='success'>Auto</Button>
        <Button onClick={handleSubmit4} variant='contained' color='success'>Optimize</Button>
        <Button onClick={handleSubmit5} variant='contained' color='success'>GUIDE</Button>
        <div id="switch">
        <FormControlLabel 
          control={<Switch color="success" onChange={(e) => setIsTextFieldFocused(e.target.checked)} />}
        />
        </div>
        <TextareaAutosize
          className='textinput'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={textFieldRef}
          id="outlined-basic"
          label="Custom Input"
          variant="outlined"
          placeholder='Enter your Custom Input'
          autoFocus={isTextFieldFocused}
        />
      </div>
      <pre>{output}</pre>
    
    
    </>
    
    }
    </div>
  );
}

export default App;