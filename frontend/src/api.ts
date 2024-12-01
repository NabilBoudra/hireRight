import axios from 'axios';
import {msalInstance} from './auth';

const api = axios.create({ 
    baseURL: 'http://localhost:3000', 
    timeout: 2500, 
})

api.interceptors.request.use(
    async (config) => { 
        try { 
            const response = await msalInstance.acquireTokenSilent({ 
                scopes: ["profile"]
            });
            config.headers.Authorization = `Bearer ${response.accessToken}`; 
            console.log(config.headers.Authorization)
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