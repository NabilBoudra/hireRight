import { User } from '@prisma/client';
import Prisma from '../prisma/prisma'; 

export async function getJobs() { 
    const jobs = await Prisma.job.findMany(); 
    return jobs; 
}

export async function addUser(user: User) {
    const upsertedUser = await Prisma.user.upsert({
        where: { 
            id: user.id, 
        }, 
        create: user,
        update: user,
    })
    return upsertedUser; 
}
export async function addApplication(userId: string, jobId: string, fileName: string) { 
    const addedApplication = await Prisma.application.create({
        data: { 
            userId,
            jobId, 
            fileName,
        }
    });
    return addedApplication;
}