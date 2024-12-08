import express from 'express';
import { addApplication, getJobs } from './services';
import {Request, Response} from 'express' 
import { checkDecodedToken, handleResumeUpload } from './middlewares';

const router = express.Router();

router.post('/apply', checkDecodedToken, handleResumeUpload, async (req: Request, res: Response) => { 
  try {
    addApplication(req.user!.id, req.body.id, req.file!.filename)
    res.status(200).end();
  }
  catch(error) { 
    console.log(error); 
  }
})

router.get('/jobs', async (req: Request, res: Response) => {
  try { 
    const jobs = await getJobs(); 
    res.json(jobs);
  }
  catch(e) { 
    console.log(e); 
  }

});

export default router; 