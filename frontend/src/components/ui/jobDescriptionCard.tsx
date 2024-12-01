import { Card, CardContent, CardDescription, CardHeader} from "./card";
import Markdown from 'react-markdown';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "./separator";
import { Job } from "@/utils/types";
import BookmarkButton from "./BookmarkButton";
import Upload from "./Upload";


function JobDescriptionCard({jobItem, className}: {jobItem: Job, className: string}) { 
    return <Card className={className}>
                    <CardHeader>
                    <div className="flex justify-between flex-wrap items-center">
                        <h4 className="scroll-m-20 text-xl bold tracking-tight ">{jobItem.title}</h4>
                        <div className="flex items-center">
                            <BookmarkButton />
                            <Upload/>
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
