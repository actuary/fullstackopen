import { Gender, NewPatientEntry, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, HealthCheckRating, Discharge, SickLeave, Diagnosis } from "./types";


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)) {
    throw new Error('Incorrect data: some fields are missing in patient');
  }

  const name = parseString(object.name, 'name');
  const dateOfBirth = parseDate(object.dateOfBirth, 'dateOfBirth');
  const ssn = parseString(object.ssn, 'ssn');
  const gender = parseGender(object.gender);
  const occupation = parseString(object.occupation, 'occupation');
  const entries: Entry[] = parseEntries(object.entries);

  return {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
  };
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }

  return entries.map((entry: unknown) => toNewEntry(entry));
};

export const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in object)) {
    throw new Error('Incorrect data: some fields are missing in entry');
  }

  const type = parseString(object.type, 'type');

  switch (type) {
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthCheckEntry(object);
    case 'Hospital':
      return toNewHospitalEntry(object);
    case 'HealthCheck':
      return toNewHealthCheckEntry(object);
    default:
      throw new Error('Incorrect entry type');
  }
};

const toNewHospitalEntry = (object: object): HospitalEntry => {
  if (!('id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'type' in object)) {
    throw new Error('Incorrect data: some fields are missing in hospital entry');
  }

  const id = parseString(object.id, 'id');
  const description = parseString(object.description, 'description');
  const date = parseDate(object.date, 'date');
  const specialist = parseString(object.specialist, 'specialist');
  

  if (!('discharge' in object)) {
    throw new Error('Incorrect data: some fields are missing in hospital entry');
  }

  const discharge = toNewDischarge(object.discharge);
  const diagnosisCodes = 'diagnosisCodes' in object ? parseDiagnosesCodes(object.diagnosisCodes) : undefined;

  return {
    id,
    description,
    date,
    specialist,
    discharge,
    diagnosisCodes,
    type: 'Hospital'
  };
};

const parseDiagnosesCodes = (codes: unknown): Array<Diagnosis['code']> | undefined => {
  if (!codes || !Array.isArray(codes)) {
    return undefined;
  }

  return codes.map( (code) => parseString(code, 'code'));
};

const toNewDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('date' in discharge && 'criteria' in discharge)) {
    throw new Error('Incorrect data: some fields are missing in discharge');
  }

  const date = parseDate(discharge.date, 'date');
  const criteria = parseString(discharge.criteria, 'criteria');

  return {
    date, criteria
  };
};

const toNewHealthCheckEntry = (object: object): HealthCheckEntry => {
  if (!('id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'type' in object)) {
    throw new Error('Incorrect data: some fields are missing in health check entry');
  }

  const id = parseString(object.id, 'id');
  const description = parseString(object.description, 'description');
  const date = parseDate(object.date, 'date');
  const specialist = parseString(object.specialist, 'specialist');

  if (!('healthCheckRating' in object)) {
    throw new Error('Incorrect data: some fields are missing in health check entry');
  }

  const healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
  const diagnosisCodes = 'diagnosisCodes' in object ? parseDiagnosesCodes(object.diagnosisCodes) : undefined;

  return {
    id,
    description,
    date,
    specialist,
    healthCheckRating,
    diagnosisCodes,
    type: 'HealthCheck'
  };
};

const toNewOccupationalHealthCheckEntry = (object: object): OccupationalHealthcareEntry => {
  if (!('id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'type' in object)) {
    throw new Error('Incorrect data: some fields are missing in occ health entry');
  }

  const id = parseString(object.id, 'id');
  const description = parseString(object.description, 'description');
  const date = parseDate(object.date, 'date');
  const specialist = parseString(object.specialist, 'specialist');

  if (!('employerName' in object)) {
    throw new Error('Incorrect data: some fields are missing in health check entry');
  }

  const employerName = parseString(object.employerName, 'employerName');
  const diagnosisCodes = 'diagnosisCodes' in object ? parseDiagnosesCodes(object.diagnosisCodes) : undefined;

  if (!('sickLeave' in object)) {
    return {
      id,
      description,
      date,
      specialist,
      employerName,
      diagnosisCodes,
      type: 'OccupationalHealthcare'
    };
  }

  const sickLeave = toNewSickLeave(object.sickLeave);

  return {
    id,
    description,
    date,
    specialist,
    employerName,
    sickLeave,
    diagnosisCodes,
    type: 'OccupationalHealthcare'
  };
};

const toNewSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('startDate' in sickLeave && 'endDate' in sickLeave)) {
    throw new Error('Incorrect data: some fields are missing in sick leave');
  }

  const startDate = parseDate(sickLeave.startDate, 'startDate');
  const endDate = parseDate(sickLeave.endDate, 'endDate');

  return {
    startDate, endDate
  };
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (typeof healthCheckRating !== 'number') {
    throw new Error('Incorrect health check rating');
  }

  if (healthCheckRating !== 0 && !healthCheckRating) {
    throw new Error('Missing health check rating');
  }

  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }

  return healthCheckRating;
};

export const parseString = (value: unknown, name: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${name}`);
  }

  return value;
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown, name: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${name} date`);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};



export default toNewPatientEntry;