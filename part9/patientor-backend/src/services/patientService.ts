import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientEntry, EntryWithoutId } from '../types';

import { v1 as uuid } from 'uuid';

const newPatientId = (): string => uuid();
const newEntryId = (): string => uuid();

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
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

const addNewPatientEntry = (patientId: string, entry: EntryWithoutId) => {
  const foundPatient = patients.find( (patient) => patient.id === patientId);

  if (!foundPatient) {
    throw new Error('No patient with supplied id!');
  }

  const newEntry = {
    ...entry,
    id: newEntryId()
  };

  foundPatient.entries.push(newEntry);

  return newEntry;
};

export default {
  getNonSensitivePatients,
  getPatients,
  getPatientById,
  addNewPatient,
  addNewPatientEntry
};

