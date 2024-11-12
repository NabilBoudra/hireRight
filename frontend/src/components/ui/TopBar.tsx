import { Button } from "@/components/ui/button"
import LoginIcon from '@mui/icons-material/Login';
import { Separator } from "@/components/ui/separator"

function TopBar() { 
    return <>
    <div className="border-b-2">
        <div className="mx-[10%] h-16 flex items-center py-3">
            <div className="grow flex justify-start">
              <h2>hireRight</h2>
            </div>
            <div className="grow flex justify-end">
              <Button className="bg-accent-foreground mx-1">
                <LoginIcon/>
                Sign in
                </Button>
                <Separator orientation="vertical" className="mx-1"/>
                <Button variant="ghost" >Employers/Post Job</Button>
            </div>
          </div>
      </div>
    </>
}

export default TopBar;