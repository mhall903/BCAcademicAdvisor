import React from 'react';
//import {Switch} from 'react-router-dom';
//import Home from './containers/Home';
//import NotFound from './containers/NotFound';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import NotFound from './components/NotFound'

import RegisterSuccess from './components/RegisterSuccess';

const Router =() => (
    <HashRouter>
    <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Home" component={Home}/>
        <Route exact path="/Login" component={LoginPage}/>
        <Route exact path="/Success" component={RegisterSuccess}/>
        <Route exact path="/NotFound" component={NotFound}/>
        <Route exact path="/Console" component={Sidebar}/>
        <Route path = "*" component={NotFound}/>

        
        
    </Switch>

    </HashRouter>

);

export default Router;