import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication({ 
auth: { 
    clientId: "242946e7-cf63-428f-856f-48c066941fbe",
    authority: "https://login.microsoftonline.com/7025e04c-70ca-48bf-ab7b-73954cb846ad"

}
});
await msalInstance.initialize(); 

async function handleLogin(){ 
    const response = await msalInstance.loginPopup(); 
    msalInstance.setActiveAccount(response.account);
}; 

export {msalInstance, handleLogin}; 