import express, { Request, Response } from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors<Request>());

const PORT = 3001;

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});