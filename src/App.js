  // eslint-disable-next-line   --    to disable the warning message coming from the next line
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Navbar from './MyComponents/Navbar';
import About from './MyComponents/About';
import Home from './MyComponents/Home';

import NoteState from './MyContexts/NoteState';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  const [mode, setMode] = useState("light");


  let modeChanger = () => {
    if(mode === "light") {
      document.body.classList.add("dark");
      setMode("dark");
    }
    else {
      document.body.classList.remove("dark");
      setMode("light");
    }
  }


  return (

    <NoteState>
      <Router>
        <Navbar title="iNotebook" useMode={ mode } toggleMode={ modeChanger } />
        <Routes>
          <Route exact path="/" element={ <Home useMode={ mode } /> }/>
          <Route exact path="/about" element={ <About useMode={ mode } /> }/>
        </Routes>
      </Router>
    </NoteState>

  );
}


export default App;
