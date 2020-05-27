import React,{useState,useEffect} from 'react';
import { Link ,BrowserRouter} from 'react-router-dom'
import homebackground from './bg.jpg';
import {RightSquareFilled   } from '@ant-design/icons'
import  './Home.css'

const homeImage = {
    backgroundImage: 'url(' + homebackground + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'noRepeat', 
            width: '100vw',
          height: '100vh'
  }

const icon = {
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width: '100%'
}


  function HomePage() {
    function Larger(e) {
        e.target.style.fontSize = '200px';
      }
      function Smaller(e) {
        e.target.style.fontSize = '100px';
      }
        return(
            <div id="c1"  style={ homeImage }
            justifyContent= 'center'  
            
            >
                <Link to ='/Login'>
                <RightSquareFilled 
                style={icon}
                fontSize='100px'
                onMouseEnter={Larger}
               onMouseEnter={Smaller}
                />
                </Link>
            </div>

        )
    
}
export default HomePage;
