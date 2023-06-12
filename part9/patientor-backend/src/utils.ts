import { Gender, NewPatientEntry, Entry } from "./types";


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if (!('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object))  {
    throw new Error('Incorrect data: some fields are missing');
  }

  const name = parseName(object.name);
  const dateOfBirth = parseDateOfBirth(object.dateOfBirth);
  const ssn = parseSsn(object.ssn);
  const gender = parseGender(object.gender);
  const occupation = parseOccupation(object.occupation);
  const entries: Entry[] = [];

  return {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
  };
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing name');
  }

  return ssn;
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

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing date of birth: ' + dob);
  }
  return dob;
};

export default toNewPatientEntry;