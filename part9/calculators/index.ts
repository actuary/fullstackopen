import express from 'express';
const app = express();

import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {

  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height) {
    res.send({
      error: "malformatted parameters"
    });
  } else if (!req.query.weight) {
    res.send({
      error: "malformatted parameters"
    });
  } else {

    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    res.send({
      weight,
      height,
      bmi: calculateBMI(height, weight)
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({
      error: "parameters missing"
    });
  }

  console.log(req.body);
  const exercises = daily_exercises as number[];
  const targetHours = target as number;

  
  if (exercises.length === 0) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }

  if (targetHours < 0) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }

  return res.send(
    calculateExercises(exercises, targetHours)
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});