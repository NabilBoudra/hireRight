import { useContext, useRef } from "react";
import { Button } from "./button";
import LoginDiv from "./loginDiv";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CheckIcon from '@mui/icons-material/Check';
import api from "@/api";
import { useToast } from "@/hooks/use-toast";
import { JobContext } from "@/contexts/JobContext";

function Upload() { 
    const jobItem = useContext(JobContext);
    const inputRef = useRef(null); 
    const { toast } = useToast(); 

    const handleFileChange = async (event) => { 
        event.preventDefault();
        try { 
            if(!jobItem) { 
                throw new Error('jobItem is null');
            }
            await api.post('/apply', { 
                resume: event.target.files[0],
                jobId: jobItem.id
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
                {(jobItem.hasApplied?
                    <Button onClick={() => inputRef.current.click()} className="text-black h-[40px]"> <CheckIcon/>Applied</Button> 
                    :
                    <Button onClick={() => toast({title: `You already applied for this position.`})} className="text-black h-[40px]"> <WorkOutlineIcon/>Apply</Button> 
                )}
            </LoginDiv>
}

export default Upload;