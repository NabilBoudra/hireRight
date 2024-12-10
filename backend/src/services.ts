import { User } from '@prisma/client';
import Prisma from '../prisma/prisma'; 

export async function getJobs(userId: string | null) { 
    let jobs = null; 
    if(userId) {
        jobs = await Prisma.job.findMany({ 
            include: { 
                Application: { 
                    where: { 
                        userId,
                    }
                },
                Bookmark: { 
                    where: { 
                        userId,
                    }
                }
            }
        });
    }
    else { 
        jobs = await Prisma.job.findMany({
            include: { 
                Application: true,
                Bookmark: true,
            }
        });
    }
    const jobsWithHasApplied = jobs.map(job => { 
        return {
            id: job.id,
            title: job.title,
            company: job.company, 
            location: job.location, 
            salary: job.salary, 
            description: job.description, 
            hasApplied: job.Application.length > 0,
            hasBookmarked: job.Bookmark.length > 0,
        };
    }); 
    return jobsWithHasApplied;
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

export async function flipBookmark(userId: string, jobId: string) { 
    const bookmark = await Prisma.bookmark.delete({ 
        where: {
            userId_jobId: { 
                userId, 
                jobId
            }
        }
    });
    if(bookmark) return; 
    return await Prisma.bookmark.create({ 
        data: {
            userId, 
            jobId, 
        }
    });
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