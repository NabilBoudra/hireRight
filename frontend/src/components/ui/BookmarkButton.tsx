import { JobContext } from "@/contexts/JobContext";
import LoginDiv from "./loginDiv";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateJob } from "@/redux/slices/jobsSlice";
import { useDispatch } from "react-redux";
import api from "@/api";

function BookmarkButton(){ 
    const job = useContext(JobContext); 
    const { toast } = useToast();
    const dispatch = useDispatch(); 
    const handleBookmark = async () => {
        try {
            if(job) { 
                await api.post('/bookmark', { 
                    jobId: job.id
                }); 
                dispatch(updateJob({...job, hasBookmarked: !job.hasBookmarked}));
            }
        }
        catch(err) { 
            console.log(err); 
            toast({title: 'Something went wrong. Try again later.'})
        }
    };

    return <LoginDiv handleClick={handleBookmark}>
            {
                !job?.hasBookmarked? 
                    <BookmarkBorderIcon fontSize="medium" className="mx-[20px]"/>
                : 
                    <BookmarkIcon fontSize="medium" className="mx-[20px]"/>
            }
        </LoginDiv>
}

export default BookmarkButton; 