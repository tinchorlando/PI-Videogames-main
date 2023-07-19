import './App.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Detail from './Pages/Detail/Detail';
import Form from './Components/Form/Form.jsx';
import Home from './Pages/Home';
import Nav from './Components/Nav';

export default function App() {
  const location = useLocation()
  return (
    <div className="App">
    {location.pathname !== '/' ? <Nav/> : null}
    <Routes>
      <Route exact path = '/' element={<Welcome/>}/>
      <Route path='/home/' element={<Home/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/form' element={<Form/>}/>      
    </Routes>

    
    
    </div>
  );
}

