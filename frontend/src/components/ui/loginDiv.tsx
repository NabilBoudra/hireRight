import { handleLogin } from "@/auth";
import { useMsal } from "@azure/msal-react";
import React from "react";

function LoginDiv({ handleClick, children }: {handleClick: () => void, children: React.ReactNode}) { 
    const { instance } = useMsal(); 
    
    return ( instance.getActiveAccount()?
                <div onClick={ handleClick }> 
                    {children}
                </div>
            : 
                <div onClick={ handleLogin }>
                    {children}
                </div>
    ); 
};

export default LoginDiv; 