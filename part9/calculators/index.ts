import express from 'express';
const app = express();

import { calculateBMI } from './bmiCalculator';

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
    })
  } else if (!req.query.weight) {
    res.send({
      error: "malformatted parameters"
    })
  } else {

    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    res.send({
      weight,
      height,
      bmi: calculateBMI(height, weight)
    })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});