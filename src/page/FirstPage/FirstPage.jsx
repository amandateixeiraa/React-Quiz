import React from 'react';
import Heading from './Heading';
import ImageGirls from './ImageGirls';
import StartBtn from './StartBtn';

function FirstPage(){
    return(
        <div className="wrapper"> 
        <div  className='heading-wrapper'>
        <Heading/>
        <StartBtn/>
        </div>
        <ImageGirls/>
      </div>
    )
}

export default FirstPage;