import {Card, CardHeader, CardContent, CardDescription, CardTitle} from './card';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function JobListingCard({jobItem}: {jobItem: any}) { 
    
    let salaryRange = null;
    if(jobItem.salaryLow && jobItem.salaryHigh) 
        salaryRange = jobItem.salaryLow + " - " + jobItem.salaryHigh + " " + jobItem.salaryCurrency;
    else if(jobItem.salaryLow) 
        salaryRange = jobItem.salaryLow + " " + jobItem.salaryCurrency; 
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
                {salaryRange && <CardDescription className="my-0">{salaryRange}</CardDescription>}
             </CardHeader>
    </Card>
    );
}

export default JobListingCard;