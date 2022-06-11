import './App.css';
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import Welcome from './Components/Welcome.jsx';
import Detail from './Components/Detail.jsx';
import Form from './Components/form.jsx';
import Home from './Components/Home.jsx';
import Nav from './Components/Nav.jsx';

function App() {
  const location = useLocation()
  return (
    <div className="App">
    <Route exact path = '/' component={Welcome}/>
    {location.pathname !== '/' ? <Nav/> : null}
    <Route path='/home' component={Home}/>
    <Route path='/detail' component={Detail}/>
    <Route path='/form' component={Form}/>

    
    
    </div>
  );
}

export default App;
