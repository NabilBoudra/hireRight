import { Job } from '@/utils/types';
import {Card, CardHeader, CardDescription, CardTitle} from './card';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function JobListingCard({jobItem}: {jobItem: Job}) { 
    return (
        <Card className="w-[100%] mb-1 hover:bg-secondary">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>
                        {jobItem.title}
                    </CardTitle>
                    <BookmarkBorderIcon/>
                </div>
                <CardDescription className="my-0">{jobItem.company}</CardDescription>
                <CardDescription className="my-0">{jobItem.location}</CardDescription>
                {jobItem.salary && <CardDescription className="my-0">{jobItem.salary} $</CardDescription>}
             </CardHeader>
    </Card>
    );
}

export default JobListingCard;