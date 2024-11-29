import { useMsal } from "@azure/msal-react";
import React from "react";

function LoginDiv({ handleClick, children }: {handleClick: () => void, children: React.ReactNode}) { 
    const { instance, accounts } = useMsal(); 
    
    return ( accounts.length?
                <div onClick={ handleClick }> 
                    {children}
                </div>
            : 
                <div onClick={() => instance.loginPopup()}>
                    {children}
                </div>
    ); 
};

export default LoginDiv; 