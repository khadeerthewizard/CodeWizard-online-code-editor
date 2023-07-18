import axios from 'axios';
import './App.css';
import React,{useState} from 'react';
import Editor from "@monaco-editor/react"
import Navbar from './Navbar.js';

function App() {
  const [code,setCode] = useState('');
  const [output,setOutput] =useState('');
  const [language,setLanguage] =useState('cpp');
  const [theme,setTheme]=useState('vs-dark');

  const handleSubmit = () =>{
    const payload = {
      language : language,
      code,
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
      <div id='run'><button onClick={handleSubmit}>Run</button></div>
      <pre>{output}</pre>
      

    </div>
  );
}

export default App;
