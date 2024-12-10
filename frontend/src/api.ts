import axios from 'axios';
import {msalInstance} from './auth';

const api = axios.create({ 
    baseURL: 'http://localhost:3000', 
    timeout: 10000, 
})

api.interceptors.request.use(
    async (config) => { 
        try { 
            const response = await msalInstance.acquireTokenSilent({ 
                scopes: ["242946e7-cf63-428f-856f-48c066941fbe/.default"]
            });
            config.headers.Authorization = `Bearer ${response.accessToken}`; 
            return config;
        }
        catch(error){ 
            console.log(error);
            return config; 
        }
    }
)

api.interceptors.response.use(
    (response) => { 
        return response.data
    }
)

export default api;