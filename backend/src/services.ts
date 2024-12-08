import { User } from '@prisma/client';
import Prisma from '../prisma/prisma'; 

export async function getJobs() { 
    const jobs = await Prisma.job.findMany(); 
    return jobs; 
}

export async function insertUser(user: User) {
    const upsertedUser = await Prisma.user.upsert({
        where: { 
            id: user.id, 
        }, 
        create: user,
        update: user,
    })
    return upsertedUser; 
}