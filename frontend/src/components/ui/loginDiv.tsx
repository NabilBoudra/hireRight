import { useToast } from "@/hooks/use-toast";
import { useMsal } from "@azure/msal-react";
import React from "react";

function LoginDiv({ handleClick, children }: {handleClick: () => void, children: React.ReactNode}) { 
    const { instance } = useMsal(); 
    const { toast } = useToast(); 
    const handleLoggedOutUserClick = (e) => {
        e.preventDefault();
        toast({
            title: 'You must be logged in to use this feature.'
        })
    }; 

    return ( instance.getActiveAccount()?
                <div onClick={ handleClick }> 
                    {children}
                </div>
            : 
                <div onClick={ handleLoggedOutUserClick }>
                    {children}
                </div>
    ); 
};

export default LoginDiv; 