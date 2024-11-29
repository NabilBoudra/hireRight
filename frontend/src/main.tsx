import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

  const msalInstance = new PublicClientApplication({ 
    auth: { 
      clientId: "242946e7-cf63-428f-856f-48c066941fbe",
      authority: "https://login.microsoftonline.com/7025e04c-70ca-48bf-ab7b-73954cb846ad"

    }
  });
  await msalInstance.initialize(); 

  createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>,
)
