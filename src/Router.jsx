import React from 'react';
//import {Switch} from 'react-router-dom';
//import Home from './containers/Home';
//import NotFound from './containers/NotFound';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import {HashRouter, Route, Switch,withRouter} from 'react-router-dom';
import NotFound from './components/NotFound'
import DegreePage from './components/DegreePage'
import Pdf from './components/Pdf';

import RegisterSuccess from './components/RegisterSuccess';

const Router =() => (
    <Switch>
       {/*   <Route exact path="/" component={LoginPage}/>
          <Route exact path="/Home" component={Home}/>*/}
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/Login" component={LoginPage}/>
        <Route exact path="/Success" component={RegisterSuccess}/>
        <Route exact path="/NotFound" component={NotFound}/>
        <Route exact path="/Console" component={withRouter(Sidebar)}/>
        <Route exact path="/Degree" component={DegreePage}/>
        <Route exact path="/Pdf" component={Pdf}/>
        <Route path = "*" component={NotFound}/>
        

        
        
    </Switch>

);

export default Router;