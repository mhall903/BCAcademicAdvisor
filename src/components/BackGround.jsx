import React from 'react';
import homebackground from './bellevuecollege2.png';

const homeImage = {
    backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'noRepeat', 
          width: '100vw',
        height: '100vh',
    backgroundImage: 'url(' + homebackground + ')'
  }

  export default class BackGround extends React.Component{
    state = {

    }
    formRef = React.createRef();




    render(){
        return (
          
          
            <div className="home" style={ homeImage }>
                <h1>This is red car</h1>
            </div>

        )
    }
}