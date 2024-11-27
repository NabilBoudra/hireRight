import { Job } from "./types";

export function isMatch(job: Job, searchString: String) { 
    const searchKeywords = searchString.split(' '); 
    for(const searchKeyword of searchKeywords){ 
        const lowerCaseSearchKeyword = searchKeyword.toLowerCase(); 
        const title = job.title.toLowerCase(); 
        const description = job.title.toLowerCase(); 

        if(!title.includes(lowerCaseSearchKeyword) && !description.includes(lowerCaseSearchKeyword))
            return false; 
    }
    return true; 
}