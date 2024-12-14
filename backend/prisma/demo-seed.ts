import Prisma from './prisma';
import { faker } from '@faker-js/faker';
import { addApplication } from '../src/services';

async function initDb() { 
    await Prisma.application.deleteMany({});
    await Prisma.job.deleteMany({});
    await Prisma.user.deleteMany({});
}
const jobs = [ 
    { 
        title: "Senior Software Engineer - Digital Ordering",
        company: "SpotOn",
        description: "At SpotOn, we're helping restaurants and small businesses compete and win with flexible payment and software technology—backed by real people who really care. From seamless point-of-sale systems to integrated restaurant management solutions, every SpotOn tool is designed to help local businesses increase profits and create better experiences for their customers and employees.\n\nRecently, SpotOn was:\n- Named one of Fast Company's Most Innovative Companies of 2024\n- Awarded Great Places to Work and Built In's Best Workplaces for the third year in a row\n- Selected as the Best Overall Restaurant POS by NerdWallet\n- Rated the top-rated point-of-sale (POS) for restaurants, bars, retail, and small businesses by Capterra users\nWe're committed to caring hard and moving fast so that we can continue to grow and make a positive impact together.\n\nThat's where you come in.\n\nChicago, IL or Detroit, MI or Raleigh, NC or San Francisco, CA or New York City, NY\n\nWe're on the hunt for a seasoned Senior Software Engineer to enhance our team's capabilities in delivering top-tier web service solutions, tailored specifically for managing digital ordering channels in the restaurant industry. In this critical role, you'll be at the helm of designing, developing, and refining our core web applications and micro services, leveraging Python, Go, NodeJS, TypeScript, and ReactJS. This position offers the unique opportunity to collaborate closely with a talented development team, project managers, and key stakeholders, ensuring the successful execution of software solutions that are not only high-quality but also perfectly aligned with the distinct needs of our clients in the restaurant sector."
    }, 
    { 
        title: "Senior Software Engineer, Onboarding",
        description: "CoinList is where early adopters invest in and trade the best digital assets, and it is now one of the fastest-growing crypto financial platforms. We support the entire lifecycle of crypto investment, from token sales through token distribution, trading, lending, and crypto-specific services such as staking and access to decentralized finance opportunities. CoinList users trade and store Bitcoin, Ether, Filecoin, and many other popular crypto assets through our full-service exchange while also getting access to the best new tokens before they list on other exchanges. We are the blue-chip platform for blockchain companies, helping Filecoin, Blockstack, Solana, Celo, Algorand, Dapper, and others raise over $1.1 Billion. Our customer base includes validators, miners, founders, CEOs, crypto funds, bitcoin OGs, and a broad array of crypto enthusiasts. Top-tier investors back us, and we have an office in San Francisco and co-working spaces in New York & Montréal.\n\nAs an engineer at CoinList you’ll find that your days are filled with all sorts of fascinating challenges - from building out new products to working directly with crypto builders. Our work is challenging and ambitious, which is what makes it fun.\n\nAs part of the Onboarding team, you will work in making CoinList the best and easiest exchange to use. Projects go from optimizing our onboarding flow (sign up, KYC, etc.) to making it flawless to get deposits from our users.\n\nIf you are an entrepreneurial person with exceptional engineering talent, we’d love to hear from you!",
        company: "CoinList",
    },
    { 
        title: "Software Developer - Glorieta Adventiure Camps",
        description: "Innovative Application Developer is looking for someone who will make a meaningful impact with one's work. Eagle Adventure Camps invites the applicant to bring talents to the dynamic Technology Solutions team. Here, one will design and develop cutting-edge applications that directly enhance the experiences of the employees, programs, guests, and ministry partners. Immerse oneself in a collaborative environment where the code doesn't just run programs—it furthers a mission to inspire Christ-like change. If one is ready to elevate one's career while contributing to something bigger, Glorieta Adventure Camps would want to hear from the applicant.\nAs an Application Developer on the Technology Solutions team, one will have the exciting opportunity to drive innovation and make a meaningful impact by developing high-quality applications that touch every aspect of the organization—from employees and programs to guests and ministry partners. One will be instrumental in designing, developing, and deploying applications across diverse platforms using cutting-edge technologies. The role will involve creating intuitive and user-friendly solutions, writing clean and efficient code, and ensuring optimal performance and scalability. Collaborate with cross-functional teams in a dynamic environment, contribute to project milestones, and play a key part in aligning the technological advancements with strategic objectives.\nIf one is passionate about leveraging one's full-stack development skills to make a real difference, Glorieta Adventure Camps would love to have the applicant join the mission to inspire Christ-like change.",
        company: "Glorieta Adventure Camps"
    }

]
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
                isOpen: Math.random() > 0.3,
            }   
        });
    }
    for(let job of jobs) {
        await Prisma.job.create({ 
            data: { 
                ...job, 
                salary: faker.string.numeric({ length: { min: 4, max: 5}, allowLeadingZeros: false}),
                location: `${faker.location.city()}, ${faker.location.country()}`,
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

    const randomDayFromLast30Days = () => {
        const now = new Date();
        let days = Math.floor(Math.random() * 30);
        if(Math.random() < 0.5) { 
            days = Math.floor(Math.random() * 7);
        }
        now.setDate(now.getDate() - days);
        return now;
    }
    for (let i = 0; i < 250; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const job = jobs[Math.floor(Math.random() * jobs.length)];
        const fileId = Math.floor(Math.random()  * 117).toString();
        const findApplication = await Prisma.application.findFirst({
            where: {
                userId: user.id,
                jobId: job.id,
            }
        });
        if(findApplication) { 
            continue; 
        }
        try { 
            await addApplication(user.id, job.id, `${fileId}.pdf`, `../resumes/${fileId}.pdf` , randomDayFromLast30Days(), Math.random() < 0.2);
        }
        catch(e) { 
            await new Promise((resolve) => setTimeout(resolve, 500));
        } 
    }
    
}

async function devSeed() { 
    try { 
        //await initDb(); 
        //await seedJobs();
        //await seedUsers();
        //await seedApplications();
        //write a raw query that replaces all fileNames with fileName.pdf 
// First get all applications without .pdf extension
const applications = await Prisma.application.findMany({
    where: {
      NOT: {
        fileName: {
          endsWith: '.pdf'
        }
      }
    }
  });
  
  // Update each one
  for (const app of applications) {
    await Prisma.application.update({
      where: {
        userId_jobId: {
          userId: app.userId,
          jobId: app.jobId
        }
      },
      data: {
        fileName: `${app.fileName}.pdf`
      }
    });
  }
        
    }
    catch(e) { 
        console.log(e);
    }
}

devSeed();