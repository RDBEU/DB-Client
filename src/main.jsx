import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { AuthProviderWrapper } from "./context/auth.context";
import './index.css'
import {disableReactDevTools} from'@fvilers/disable-react-devtools'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
      <App />
      </AuthProviderWrapper>
    </BrowserRouter>  
  </React.StrictMode>,
)
