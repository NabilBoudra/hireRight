import { useRef } from "react";
import { Button } from "./button";
import LoginDiv from "./loginDiv";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import api from "@/api";
import { useToast } from "@/hooks/use-toast";

function Upload() { 
    const inputRef = useRef(null); 
    const { toast } = useToast(); 

    const handleFileChange = async (event) => { 
        event.preventDefault();
        try { 
            await api.post('/apply', { 
                resume: event.target.files[0]    
            },
            { 
                headers: { 
                    "Content-Type": "multipart/form-data",
                }
            });
        }
        catch(error) { 
            toast({ 
                title: 'Something went wrong. Please try again',
            })
            console.log(error); 
        }
    }

    return <LoginDiv>
                <input
                    type="file"
                    accept=".pdf"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <Button onClick={() => inputRef.current.click()} className="text-black h-[40px]"> <WorkOutlineIcon/> Apply</Button> 
            </LoginDiv>
}

export default Upload;