import express, {Request, Response} from 'express';
import { getJobs } from './services';
import cors from 'cors';
import morgan from 'morgan'
import multer from 'multer'
import './types'
import { checkDecodedToken, decodeTokenIfExists } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({dest: 'resumes/'})

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(decodeTokenIfExists)

app.use('/apply', checkDecodedToken);
app.post('/apply', upload.single('resume'), async (req: Request, res: Response) => { 
  try {
    res.status(200).end();
  }
  catch(error) { 
    console.log(error); 
  }
})

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
