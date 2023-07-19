import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/Store.js'
import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_APP_API || "http://localhost:3001";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>        
    </Provider>
  </React.StrictMode>
)


