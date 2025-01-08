import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FirstPage from './page/FirstPage/FirstPage';
import SecondPage from './page/SecondPage/SecondPage';
import ThirdPage from './page/ThirdPage/ThirdPage';

function App(){
  return(
    <Router basename="/React-Quiz">
      <Routes>
        <Route path="/" element={<FirstPage />}></Route>
        <Route path="/secondpage" element={<SecondPage/>}></Route>
        <Route path="/page/Thirdpage/Results" element={<ThirdPage/>}></Route> 
      </Routes>
    </Router>
      
    );

}

export default App;
