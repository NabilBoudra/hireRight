import { User } from '@prisma/client';
import Prisma from '../prisma/prisma'; 
import { promises as fs } from 'fs';
import { parsePdf } from './helpers';
import { ChatCompletion } from 'openai/resources';
import { zodResponseFormat } from "openai/helpers/zod";
import { openai } from './openai';
import { z } from "zod";


export async function getOpenJobs(userId: string | null) { 
    if(!userId) { 
        const jobs = await Prisma.job.findMany(); 
        return jobs.map(job => ({...job, hasApplied: false, hasBookmarked: false}))
    }
    const jobs = await Prisma.job.findMany({ 
        where: { 
            isOpen: true, 
        },
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

export async function addApplication(userId: string, jobId: string, fileName: string, path: string) { 
    const job = await Prisma.job.findUnique({ 
        where: { 
            id: jobId, 
        }
    }); 
    if(!job || !job.isOpen){ 
        throw new Error("Cannot apply to a closed job");
    }
    const fileBuffer = await fs.readFile(path);
    const parsedPdf = await parsePdf(fileBuffer);
    const completion = await openai.chat.completions.create(
        {
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user", 
            content: `Given a resume and a job description, extract the following details and format the output as JSON:

                    {
                        "summary": ["string1", "string2", "string3"],  // A list of key professional traits or experience from the resume
                        "skills": ["string1", "string2", "string3"],   // A list of skills relevant to the job from the resume
                        "yoe": number,  // Years of experience from the resume (positive integer)
                        "score": number  // A score between 0 and 10 representing the match between the resume and job description
                    }

                    - Make sure that every skills are granular that is don't include multiple skills in the same entry of the skills array.
                    - Include 3 skills ordered in relevance. Include less if there are less than 3 skills.
                    - Include at most 3 summary bullet points. Make sure that each bullet point is at most 80 characters long.
                    - Score should take into account if the reusme and job description match. 
                    - Score of 0 is a strong no hire 
                    - Score of 5 is a neutral score, prefer other candidates.
                    - Score of 10 is a Perfect hire.
                    Example:

                    {
                        "summary": ["Experienced head chef with international experience", 
                                    "Specializes in French and Italian cuisine", 
                                    "Strong leadership and menu design expertise"],
                        "skills": ["Menu planning", "Food safety compliance", "Team management"],
                        "yoe": 10,
                        "score": 8
                    }

                    Resume:
                    ${parsedPdf}

                    Job Description:
                    ${job.title}
                    ${job.description}
            `
          }],
        }
    )
    const content = JSON.parse(completion.choices[0].message.content!);
    const formattedContent = { 
        summary: content.summary.length <= 3 ? content.summary : content.summary.slice(0, 3), 
        skills: content.skills.length <= 3 ? content.skills : content.skills.slice(0, 3),
        yoe: content.yoe, 
        score: content.yoe
    }
    const addedApplication = await Prisma.application.create({
        data: { 
            userId,
            jobId, 
            fileName,
            summary: formattedContent.summary,
            skills: formattedContent.skills, 
            yoe: formattedContent.yoe, 
        }
    });
    return addedApplication;
}


export async function getMainStatistics() { 
    const openJobsCount = await Prisma.job.count({
        where: {
            isOpen: true, 
        }
    });
    const unreviewedApplicationsCount = await Prisma.application.count({ 
        where: { 
            isReviewed: false, 
        }
    })

    const applications: any[] = await Prisma.$queryRaw`
        WITH RECURSIVE dates AS (
            SELECT CURRENT_DATE - INTERVAL '29 days' AS date
            UNION ALL
            SELECT date + INTERVAL '1 day'
            FROM dates
            WHERE date + INTERVAL '1 day' <= CURRENT_DATE
        )
        SELECT 
            d.date, 
            COALESCE(COUNT(a."userId"), 0) as count 
        FROM 
            dates d
        LEFT JOIN 
            "Application" a ON DATE(a.date) = d.date
        GROUP BY 
            d.date
        ORDER BY 
            d.date
    `;
    
    const formattedApplications = applications.map(app => { 
        return {
        ...app,
        count: Number(app.count),
        }
    });
    return {openJobsCount, unreviewedApplicationsCount, chartStatistics: formattedApplications};
}

export async function getAllStatisticsByJob() { 
    const jobStatistics: any[] = await Prisma.$queryRaw`
    SELECT 
        j.*, 
        COUNT(a."userId") as "applicationsCount", 
        SUM(CASE WHEN a."isReviewed" = false THEN 1 ELSE 0 END) as "unreviewedApplicationsCount"
    FROM 
        "Job" j
    LEFT JOIN 
        "Application" a ON j.id = a."jobId"
    GROUP BY 
        j.id
`;


    return jobStatistics.map(jobStatistic => ({ 
        ...jobStatistic, 
        applicationsCount: Number(jobStatistic.applicationsCount), 
        unreviewedApplicationsCount: Number(jobStatistic.unreviewedApplicationsCount), 
    }))
}

export async function getJobStatistics(id: string) {
    const job = await Prisma.job.findUnique({
        where: { id },
        include: {
            _count: {
                select: { Application: true },
            },
            Application: {
                where: { isReviewed: false },
            },
        },
    });

    if (!job) {
        throw new Error("Job not found");
    }

    const applicationsCount = job._count.Application;
    const unreviewedApplicationsCount = job.Application.length;
    const applications: any[] = await Prisma.$queryRaw`
        WITH RECURSIVE dates AS (
            SELECT CURRENT_DATE - INTERVAL '29 days' AS date
            UNION ALL
            SELECT date + INTERVAL '1 day'
            FROM dates
            WHERE date + INTERVAL '1 day' <= CURRENT_DATE
        )
        SELECT 
            d.date, 
            COALESCE(COUNT(a."userId"), 0) as count 
        FROM 
            dates d
        LEFT JOIN 
            "Application" a ON DATE(a.date) = d.date AND a."jobId" = ${id}
        GROUP BY 
            d.date
        ORDER BY 
            d.date
    `;

    const formattedApplications = applications.map(app => { 
        return {
            ...app,
            count: Number(app.count),
        }
    });
    return {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.description,
        applicationsCount: Number(applicationsCount),
        unreviewedApplicationsCount: Number(unreviewedApplicationsCount),
        chartStatistics: formattedApplications,
    };
}
