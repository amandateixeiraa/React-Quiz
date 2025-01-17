import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FirstPage from './page/FirstPage/FirstPage';
import SecondPage from './page/SecondPage/SecondPage';
import ThirdPage from './page/ThirdPage/ThirdPage';
import nnnoiseImage from './assets/nnnoise1.svg';

function App(){
  return(
    <div>
    <div className = "overlay">
    <img src={nnnoiseImage} alt="Overlay" className='overlayImg'/>
    </div>
    <div className='content'>
    <Router basename="/React-Quiz">
      <Routes>
        <Route path="/" element={<FirstPage />}></Route>
        <Route path="/secondpage" element={<SecondPage/>}></Route>
        <Route path="/page/Thirdpage/Results" element={<ThirdPage/>}></Route> 
      </Routes>
    </Router>
    </div>
    </div>
  
      
    );

}

export default App;
