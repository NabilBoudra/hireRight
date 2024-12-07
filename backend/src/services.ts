import Prisma from '../prisma/prisma'; 

export async function getJobs() { 
    const jobs = await Prisma.job.findMany(); 
    return jobs; 
}
