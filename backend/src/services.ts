import Prisma from '../prisma/prisma'; 
export async function getJobs() { 
    try { 
        const jobs = await Prisma.job.findMany(); 
        return jobs; 
    }
    catch(error) { 
        console.log("Couldnt't get posts")
    }
}