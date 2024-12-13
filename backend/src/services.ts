import { User } from '@prisma/client';
import Prisma from '../prisma/prisma'; 

export async function getJobs(userId: string | null) { 
    if(!userId) { 
        const jobs = await Prisma.job.findMany(); 
        return jobs.map(job => ({...job, hasApplied: false, hasBookmarked: false}))
    }
    const jobs = await Prisma.job.findMany({ 
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
    const jobsWithHasApplied = jobs.map(job => { 
        return {
            id: job.id,
            title: job.title,
            company: job.company, 
            location: job.location, 
            salary: job.salary, 
            description: job.description, 
            hasApplied: (('Application' in job) && (job.Application.length > 0) ),
            hasBookmarked: (('Bookmark' in job) && (job.Bookmark.length > 0)),
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
    const exists = await Prisma.bookmark.findFirst({
        where: { 
            userId, 
            jobId
        }
    });
    if(exists) { 
        const bookmark = await Prisma.bookmark.delete({ 
            where: {
                userId_jobId: { 
                    userId, 
                    jobId
                }
            }
        });
        return; 
    }
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

export async function getMainStatistics() { 
    const applications: any[] = await Prisma.$queryRaw`
        SELECT 
            DATE("date") as date, 
            COUNT(*) as count 
        FROM 
            "Application" 
        GROUP BY 
            DATE("date")
        ORDER BY 
            DATE("date")
    `;
    const formattedApplications = applications.map(app => { 
        return {
        ...app,
        count: Number(app.count),
        }
    });
    return formattedApplications;
}