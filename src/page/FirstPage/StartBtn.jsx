import React from 'react';
import { useNavigate } from 'react-router-dom';


function StartBtn(){
  const navigate = useNavigate();
    return(
        <div className='startBtn-wrapper'>
          <button className="startBtn" onClick={() => navigate('/SecondPage')}>Start quiz </button>
        </div>
    )
  }

export default StartBtn;