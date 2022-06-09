import './App.css';
import React from 'react';
import { Route , Switch } from 'react-router-dom';
import Detail from './Components/Detail.jsx';
import Form from './Components/form.jsx';
import Home from './Components/Home.jsx';
import Nav from './Components/Nav.jsx';
import Welcome from './Components/Welcome.jsx';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
        {/* <Nav/> */}
      

        
        <Switch>
          <Route
            exact path='/'
            render={Welcome}
          
          />
          <Route
            exact path='/home'
            component={Home}
          />
          <Route
            exact path='/detail'
            component={Detail}
          />
          <Route
            exact path='/form'
            component={Form}
          />
          
        </Switch>      
    </div>
  );
}

export default App;
