import './extensions'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import { decodeTokenIfExists } from './middlewares';
import router from './router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(decodeTokenIfExists)

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
