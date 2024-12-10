import { JobContext } from "@/contexts/JobContext";
import LoginDiv from "./loginDiv";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useContext } from "react";
import { useToast } from "@/hooks/use-toast";

function BookmarkButton(){ 
    const job = useContext(JobContext); 
    const { toast } = useToast();
    const handleBookmark = () => {
        try {
            console.log('clicked')
        }
        catch(err) { 
            console.log(err); 
            toast({title: 'Something went wrong. Try again later.'})
        }
    };

    return <LoginDiv handleClick={handleBookmark}>
            <BookmarkBorderIcon fontSize="medium" className="mx-[20px]"/>
        </LoginDiv>
}

export default BookmarkButton; 