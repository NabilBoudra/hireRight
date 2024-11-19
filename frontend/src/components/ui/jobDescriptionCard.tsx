import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader} from "./card";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Markdown from 'react-markdown';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "./separator";


function JobDescriptionCard({jobItem, className}: {jobItem: any, className: any}) { 
    return <Card className={className}>
                    <CardHeader>
                    <div className="flex justify-between flex-wrap items-center">
                        <h4 className="scroll-m-20 text-xl bold tracking-tight ">{jobItem.title}</h4>
                        <div className="flex items-center">
                        <BookmarkBorderIcon fontSize="medium" className="mx-[20px]"/>
                        <Button className="text-black h-[40px]"> <WorkOutlineIcon/> Apply</Button> 
                        </div>
                    </div>
                    <CardDescription>{jobItem.company}</CardDescription>
                    <CardDescription>{jobItem.location}</CardDescription>
                    </CardHeader>
                    <Separator className="mb-[20px] mx-[2.5%] w-[95%]"/>
                    <CardContent >
                        <ScrollArea className="h-[80vh] overflow-y-scroll whitespace-pre-wrap">
                            <Markdown>
                                {jobItem.description}
                            </Markdown>
                        </ScrollArea>
                    </CardContent>
        </Card>
};

export default JobDescriptionCard;
