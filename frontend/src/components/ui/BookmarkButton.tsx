import LoginDiv from "./loginDiv";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function BookmarkButton(){ 
    return <LoginDiv handleClick={() => console.log("bookmark clicked")}>
            <BookmarkBorderIcon fontSize="medium" className="mx-[20px]"/>
        </LoginDiv>
}

export default BookmarkButton; 