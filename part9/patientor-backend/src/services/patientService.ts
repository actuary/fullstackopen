import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';

import { v1 as uuid } from 'uuid';

const newPatientId = (): string => uuid();

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addNewPatient = (entry: NewPatientEntry) => {
  const newPatient = {
    id: newPatientId(),
    ...entry
  };
  patients.push(newPatient);
  
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatients,
  addNewPatient
};

