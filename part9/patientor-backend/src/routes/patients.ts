import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const object = req.params;
  if (!('id' in object)) {
    return res.status(400).send('request must contain id');
  }

  const id = object.id;
  const patient = patientService.getPatientById(id);

  if (!patient) {
    return res.status(400).send('patient not found');
  }

  return res.send(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    req.body.id = 'blank';
    const newEntry = toNewEntry(req.body);

    const object = req.params;
    if (!('id' in object)) {
      return res.status(400).send('request must contain id');
    }
    const patientId = object.id;
    const addedEntry = patientService.addNewPatientEntry(patientId, newEntry);

    return res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});


router.post('/', (req, res) => {
  try {
    req.body.id = '';
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;