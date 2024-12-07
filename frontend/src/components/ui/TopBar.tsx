import { Button } from "@/components/ui/button"
import LoginIcon from '@mui/icons-material/Login';
import { Separator } from "@/components/ui/separator"
import { useMsal } from "@azure/msal-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { handleLogin } from "@/auth";

function TopBar() { 
    const { instance } = useMsal(); 
    
    return <>
    <div className="border-b-2">
        <div className="ml-[20%] mr-[20%] h-16 flex items-center py-3">
            <div className="grow flex justify-start">
            <h1 className="scroll-m-20 text-xl font-extrabold">HireRight</h1>
            </div>
              { instance.getActiveAccount()?
                  <div className="grow flex justify-end">
                    <Button variant="ghost" onClick={() => instance.logoutPopup()}>
                      <AccountCircleIcon/>
                      {instance.getActiveAccount().name}
                    </Button>
                  </div>
                : 
                  <div className="grow flex justify-end">
                  <Button className="bg-accent-foreground mx-1" onClick={handleLogin}>
                    <LoginIcon/>
                    Sign in
                    </Button>
                    <Separator orientation="vertical" className="mx-1"/>
                    <Button variant="ghost" >Employers/Post Job</Button>
                  </div>
              }
            </div>
      </div>
    </>
}

export default TopBar;