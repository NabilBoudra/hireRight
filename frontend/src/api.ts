import axios from 'axios';

async function get(route: String) {
    return await axios.get('http://localhost:3000/' + route); 
}

async function getJobs() { 
    try { 
       const jobItems = await get('jobs'); 
       return jobItems.data;
    }
    catch(error) { 
        console.log(error); 
    }
    return [];
}

export default getJobs;