import axios from 'axios';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react"
import Navbar from './Navbar.js';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [input, setInput] = useState('');
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const textFieldRef = useRef(null);
  const handleSubmit = () =>{
    const payload = {
      language : language,
      code,
      input,
    };
    console.log(code);
    try {
      axios.post("http://localhost:5000/run",payload)
    .then((response) => {
      console.log(response);
      setOutput(response.data.output);
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
        fon
        value={code}
        onChange={setCode}
      />
      </div>
      <div id='run'>
        <Button onClick={handleSubmit} variant="contained" color="success">Run</Button>
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
          focused={isTextFieldFocused}
        />
      </div>
      <pre>{output}</pre>
    </div>
  );
}

export default App;