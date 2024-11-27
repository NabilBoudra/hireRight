import express, {Request, Response} from 'express';
import { getJobs } from './services';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get('/jobs', async (req: Request, res: Response) => {
  try { 
    const jobs = await getJobs(); 
    res.json(jobs);
  }
  catch(e) { 
    console.log(e); 
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
