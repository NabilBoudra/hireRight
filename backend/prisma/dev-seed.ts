import Prisma from './prisma';
import { faker } from '@faker-js/faker';

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

async function devSeed() { 
    try { 
        seedJobs();
    }
    catch(e) { 
        console.log(e);
    }
}

devSeed();