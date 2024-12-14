import express from 'express';
import { addApplication, flipBookmark, getOpenJobs, getMainStatistics, getAllStatisticsByJob, getJobStatistics } from './services';
import {Request, Response} from 'express' 
import { checkDecodedToken, handleResumeUpload } from './middlewares';

const router = express.Router();

router.post('/apply', checkDecodedToken, handleResumeUpload, async (req: Request, res: Response) => { 
  try {
    const application = await addApplication(req.user!.id, req.body.jobId, req.file!.filename, req.file!.path)
    res.json(application);
  }
  catch(error) { 
    console.log(error); 
    res.status(500).end();
  }
})

router.post('/bookmark', checkDecodedToken, async (req: Request, res: Response) => { 
  try { 
    const bookmark = await flipBookmark(req.user!.id, req.body.jobId); 
    res.json(bookmark); 
  }
  catch(error) { 
    console.log(error);
    res.status(500).end();
  }
})

router.get('/jobs', async (req: Request, res: Response) => {
  try { 
    const jobs = await getOpenJobs(req.user?.id || null); 
    res.json(jobs);
  }
  catch(e) { 
    console.log(e); 
    res.status(500).end();
  }

});

router.get('/statistics', async (req: Request, res: Response) => {
  try { 
    const statitics = await getMainStatistics(); 
    res.json(statitics);
  }
  catch(e) { 
    console.log(e); 
    res.status(500).end();
  }

});

router.get('/statistics-by-job', async (req: Request, res: Response) => {
  try { 
    const statitics = await getAllStatisticsByJob(); 
    res.json(statitics);
  }
  catch(e) { 
    console.log(e); 
    res.status(500).end();
  }

});

router.get('/statistics-by-job/:id', async (req: Request, res: Response) => {
  try { 
    const statitics = await getJobStatistics(req.params.id); 
    res.json(statitics);
  }
  catch(e) { 
    console.log(e); 
    res.status(500).end();
  }

});

export default router; 