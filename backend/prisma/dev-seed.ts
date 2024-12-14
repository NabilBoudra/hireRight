import Prisma from './prisma';
import { faker } from '@faker-js/faker';

async function initDb() { 
    await Prisma.application.deleteMany({});
    await Prisma.job.deleteMany({});
    await Prisma.user.deleteMany({});
}
async function seedJobs() { 
    for(let i = 0; i < 50; i++) { 
        const title = faker.person.jobTitle();
        const company = faker.company.name(); 
        const location = `${faker.location.city()}, ${faker.location.country()}`;
        const salary = faker.string.numeric({ length: { min: 4, max: 5}, allowLeadingZeros: false});
        const description = faker.lorem.paragraphs(10);
        await Prisma.job.create({ 
            data: { 
                title, 
                company, 
                location, 
                salary, 
                description, 
            }   
        });
    }
}

async function seedUsers() {
    for (let i = 0; i < 50; i++) {
        const id = faker.string.uuid();
        const email = faker.internet.email();
        const name = `${faker.person.firstName()} ${faker.person.lastName()}`; 
        

        await Prisma.user.create({
            data: {
                id,
                email,
                name,
            }
        });
    }
}

async function seedApplications() {
    const users = await Prisma.user.findMany();
    const jobs = await Prisma.job.findMany();

    for (let i = 0; i < 100; i++) {
        const userId = users[Math.floor(Math.random() * users.length)].id;
        const jobId = jobs[Math.floor(Math.random() * jobs.length)].id;
        const fileId = Math.floor(Math.random()  * 118);

        await Prisma.application.create({
            data: {
                userId,
                jobId,
                fileName: fileId.toString(),
            }
        });

    }

    
}

async function devSeed() { 
    try { 
        await initDb(); 
        await seedJobs();
        await seedUsers();
        await seedApplications();
        
    }
    catch(e) { 
        console.log(e);
    }
}

devSeed();