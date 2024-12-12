import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './candidate/App.tsx'
import { MsalProvider } from "@azure/msal-react";
import {msalInstance} from './auth.ts';
import {Provider} from 'react-redux';
import { store } from './redux/store.ts';
import { BrowserRouter, Route, Routes } from "react-router";
import RecruiterApp from './recruiter/App.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Provider store={store}>
            <MsalProvider instance={msalInstance}>
              <App />
            </MsalProvider>
          </Provider>
        }/>  
        <Route path="recruiter" element={<RecruiterApp/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
