import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography, Card, Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, OutlinedInput, Alert, AlertTitle } from '@mui/material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { Favorite, Female, Male, Transgender } from "@mui/icons-material";

import { apiBaseUrl } from "./constants";
import { Patient, Entry, Diagnosis, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry, HealthCheckRating, EntryFormValues } from "./types";

import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { MedicalServices, Work, AlarmAdd } from '@mui/icons-material';
import moment, { Moment } from "moment";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type EntryFormNoType = Omit<EntryFormProps, "type">;

const HospitalEntryForm = ({ cancel, patientId, handleAlert: setAlert }: EntryFormNoType) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [allDiagnosisCodes, setAllDiagnosisCodes] = useState<string[]>([]);

  const [date, setDate] = useState<Moment | null>(moment('2022-12-31'));
  const [dischargeDate, setDischargeDate] = useState<Moment | null>(moment('2022-12-31'));
  const [dischargeReason, setDischargeReason] = useState('');

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setAllDiagnosisCodes(diagnoses.map((diagnosis) => diagnosis.code));
    };
    void fetchDiagnoses();
  }, []);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry = {
      description: description,
      specialist: specialist,
      date: date ? date.format("YYYY-MM-DD") : "",
      discharge: {
        date: dischargeDate ? dischargeDate.format("YYYY-MM-DD") : "",
        criteria: dischargeReason
      },
      diagnosisCodes,
    }

    const entryToCreate: EntryFormValues = {
      ...entry,
      type: "Hospital"
    };

    try {
      await patientService.createEntry(entryToCreate, patientId);
      setAlert({success: true, message: "created new entry!"})
    } catch (error) {
      setAlert({success: false, message: `${error}`})
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      )
    }

  } 

  return (
    <Card>
      <h2>New Hospital Entry</h2>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Description"
            sx={{ m: 1 }}
            id="description-input"
            defaultValue=""
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <DatePicker 
            label="Admission Date"
            sx={{ m: 1 }}
            value={date}
            onChange={(value) => setDate(value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Specialist"
            sx={{ m: 1 }}
            id="specialist-input"
            defaultValue=""
            onChange={(event) => setSpecialist(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="diagnosis-multiple-label">Diagnoses</InputLabel>
          <Select
            labelId="diagnosis-multiple-label"
            label="Diagnoses"
            id="multiple-diagnoses"
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Diagnosis Code" />}
            sx={{ m: 1 }}
          >
            {allDiagnosisCodes.map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <DatePicker 
            label="Discharge date"
            sx={{ m: 1 }}
            value={date}
            onChange={(value) => setDischargeDate(value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Discharge reason"
            sx={{ m: 1 }}
            id="discharge-reason-input"
            defaultValue=""
            onChange={(event) => setDischargeReason(event.target.value)}
          />
        </FormControl>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item><Button onClick={() => cancel()} variant="contained" color="error">Cancel</Button></Grid>
          <Grid item><Button type='submit' variant="contained" color="primary">Submit</Button></Grid>
        </Grid>
      </form>
    </Card>
  )
}

const OccupationalHealthcareEntryForm = ({ cancel, patientId, handleAlert: setAlert }: EntryFormNoType) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [allDiagnosisCodes, setAllDiagnosisCodes] = useState<string[]>([]);

  const [date, setDate] = useState<Moment | null>(moment('2022-12-31'));
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<Moment | null>(moment('2022-12-31'));
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<Moment | null>(moment('2022-12-31'));
  const [employerName, setEmployerName] = useState('');

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setAllDiagnosisCodes(diagnoses.map((diagnosis) => diagnosis.code));
    };
    void fetchDiagnoses();
  }, []);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry = {
      description: description,
      specialist: specialist,
      date: date ? date.format("YYYY-MM-DD") : "",
      sickLeave: {
        startDate: sickLeaveStartDate ? sickLeaveStartDate.format("YYYY-MM-DD") : "",
        endDate: sickLeaveEndDate ? sickLeaveEndDate.format("YYYY-MM-DD") : "",
      },
      employerName,
      diagnosisCodes,
    }

    const entryToCreate: EntryFormValues = {
      ...entry,
      type: "OccupationalHealthcare"
    };

    try {
      await patientService.createEntry(entryToCreate, patientId);
      setAlert({success: true, message: "created new entry!"})
    } catch (error) {
      setAlert({success: false, message: `${error}`})
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      )
    }
  } 

  return (
    <Card>
      <h2>New Occupational Healthcare Entry</h2>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Description"
            sx={{ m: 1 }}
            id="description-input"
            defaultValue=""
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <DatePicker 
            label="Admission Date"
            sx={{ m: 1 }}
            value={date}
            onChange={(value) => setDate(value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Specialist"
            sx={{ m: 1 }}
            id="specialist-input"
            defaultValue=""
            onChange={(event) => setSpecialist(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="diagnosis-multiple-label">Diagnoses</InputLabel>
          <Select
            labelId="diagnosis-multiple-label"
            label="Diagnoses"
            id="multiple-diagnoses"
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Diagnosis Code" />}
            sx={{ m: 1 }}
          >
            {allDiagnosisCodes.map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <DatePicker 
            label="Sick leave start date"
            sx={{ m: 1 }}
            value={date}
            onChange={(value) => setSickLeaveStartDate(value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <DatePicker 
            label="Sick leave end date"
            sx={{ m: 1 }}
            value={date}
            onChange={(value) => setSickLeaveEndDate(value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Employer name"
            sx={{ m: 1 }}
            id="employer-name-input"
            defaultValue=""
            onChange={(event) => setEmployerName(event.target.value)}
          />
        </FormControl>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item><Button onClick={() => cancel()} variant="contained" color="error">Cancel</Button></Grid>
          <Grid item><Button type='submit' variant="contained" color="primary">Submit</Button></Grid>
        </Grid>
      </form>
    </Card>
  )
}

const HealthCheckEntryForm = ({ cancel, patientId, handleAlert: setAlert }: EntryFormNoType) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [allDiagnosisCodes, setAllDiagnosisCodes] = useState<string[]>([]);

  const [date, setDate] = useState<Moment | null>(moment('2022-12-31'));
  const [healthRating, setHealthRating] = useState<string | number>('');


  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setAllDiagnosisCodes(diagnoses.map((diagnosis) => diagnosis.code));
    };
    void fetchDiagnoses();
  }, []);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry = {
      description: description,
      specialist: specialist,
      date: date ? date.format("YYYY-MM-DD") : "",
      healthRating: healthRating,
      diagnosisCodes,
    }

    const entryToCreate: EntryFormValues = {
      ...entry,
      type: "Hospital"
    };

    try {
      await patientService.createEntry(entryToCreate, patientId);
      setAlert({success: true, message: "created new entry!"})
    } catch (error) {
      setAlert({success: false, message: `${error}`})
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      )
    }
  } 

  return (
    <Card>
      <h2>New Healthcheck Entry</h2>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Description"
            sx={{ m: 1 }}
            id="description-input"
            defaultValue=""
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <DatePicker 
            label="Admission Date"
            sx={{ m: 1 }}
            value={date}
            onChange={(value) => setDate(value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            label="Specialist"
            sx={{ m: 1 }}
            id="specialist-input"
            defaultValue=""
            onChange={(event) => setSpecialist(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="health-check-rating-label">Health check rating</InputLabel>
          <Select
            labelId="health-check-rating-select-label"
            id="health-check-rating-select"
            value={0}
            sx={{ m: 1 }}
            onChange={(event) => setHealthRating(event.target.value)}
          >
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>Critical</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="diagnosis-multiple-label">Diagnoses</InputLabel>
          <Select
            labelId="diagnosis-multiple-label"
            label="Diagnoses"
            id="multiple-diagnoses"
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Diagnosis Code" />}
            sx={{ m: 1 }}
          >
            {allDiagnosisCodes.map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item><Button onClick={() => cancel()} variant="contained" color="error">Cancel</Button></Grid>
          <Grid item><Button type='submit' variant="contained" color="primary">Submit</Button></Grid>
        </Grid>
      </form>
    </Card>
  )
}

interface AlertProps {
  success: boolean,
  message: string
}

interface EntryFormProps {
  type: string;
  cancel: () => void;
  patientId: string;
  handleAlert: (alert: AlertProps) => void;
}

const EntryForm = ({ type, cancel, patientId, handleAlert: setAlert }: EntryFormProps ) => {
  switch (type) {
    case 'Hospital':
      return <HospitalEntryForm cancel={cancel} patientId={patientId} handleAlert={setAlert}/>
    case 'HealthCheck':
      return <HealthCheckEntryForm cancel={cancel} patientId={patientId} handleAlert={setAlert}/>
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryForm cancel={cancel} patientId={patientId} handleAlert={setAlert}/>
    default:
      throw new Error(`Entry '${type}' not found.`)
  };
};

const matchEntryDiagnosesToCode = (code: Diagnosis['code'], diagnoses: Diagnosis[]): string => {
  const found = diagnoses.find((diagnosis) => diagnosis.code === code);

  return found ? found.name : 'Not found';
};

interface HospitalEntryViewProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryView = ({ entry, diagnoses }: HospitalEntryViewProps) => (
  <Card sx={{ m: 0.5 }}>
    {entry.date} <MedicalServices /><br/>
    <em>{entry.description}</em><br/>
    <p>Discharged on: { entry.discharge.date }. <em>{ entry.discharge.criteria }</em></p>
    {entry.diagnosisCodes ? 
      <>
        <h4>Diagnoses:</h4>
        <ul>
          {
            entry.diagnosisCodes.map( (code) => <li key={code}>{code}: {matchEntryDiagnosesToCode(code, diagnoses)}</li>)
          }
        </ul>
      </>
      : null
    }
    <p>Diagnosed by {entry.specialist}</p>
  </Card>
)

interface HealthCheckEntryViewProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const healthCheckRatingIcon = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy: 
      return <Favorite color='success' />;
    case HealthCheckRating.LowRisk:
      return <Favorite color='info' />;
    case HealthCheckRating.HighRisk:
      return <Favorite color='warning' />;
    case HealthCheckRating.CriticalRisk:
      return <Favorite color='error' />;
    default:
      throw new Error('oh no!');
  }
}

const HealthCheckEntryView = ({ entry, diagnoses }: HealthCheckEntryViewProps) => (
  <Card sx={{ m: 0.5 }}>
    {entry.date} <AlarmAdd /><br/>
    <em>{entry.description}</em><br/>
    {healthCheckRatingIcon(entry.healthCheckRating)}
    {entry.diagnosisCodes ? 
      <>
        <h4>Diagnoses:</h4>
        <ul>
          {
            entry.diagnosisCodes.map( (code) => <li key={code}>{code}: {matchEntryDiagnosesToCode(code, diagnoses)}</li>)
          }
        </ul>
      </>
      : null
    }
    <p>Diagnosed by {entry.specialist}</p>
  </Card>

)

interface OccupationalEntryViewProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryView = ({ entry, diagnoses }: OccupationalEntryViewProps) => (
  <Card sx={{ m: 0.5 }}>
    {entry.date} <Work /> {entry.employerName}<br/>
    <em>{entry.description}</em>
    {entry.sickLeave ? 
      <p>On sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
      : null
    }
    {entry.diagnosisCodes ? 
      <>
        <h4>Diagnoses:</h4>
        <ul>
          {
            entry.diagnosisCodes.map( (code) => <li key={code}>{code}: {matchEntryDiagnosesToCode(code, diagnoses)}</li>)
          }
        </ul>
      </>
      : null
    }
    <p>Diagnosed by {entry.specialist}</p>
  </Card>
)

interface EntryProps {
  entry: Entry;
}

const EntryView = ({ entry }: EntryProps ) => {
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnosisCodes(diagnoses);
    };
    void fetchDiagnoses();
  }, []);


  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryView entry={entry} diagnoses={diagnosisCodes} />
    case 'HealthCheck':
      return <HealthCheckEntryView entry={entry} diagnoses={diagnosisCodes} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryView entry={entry} diagnoses={diagnosisCodes} />
    default:
      return assertNever(entry);
  };
};

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [entryToAdd, setEntryToAdd] = useState('');

  const [alert, setAlert] = useState<AlertProps | null>(null)

  useEffect(() => {
    if (typeof id === 'string') {
      patientService.getById(id)
        .then(patient => setPatient(patient))
        .catch(err => setPatient(undefined));
    } else {
      setPatient(undefined);
    }
   
  }, [id]);

  const handleAlert = (alert: AlertProps) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  };

  if (patient) {
    return (
      <Card>
        <h2>{patient.name} {patient.gender === 'male' ? <Male /> : patient.gender === 'female' ? <Female /> : <Transgender />}</h2>
        <p>
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}
        </p>
        {alert ?
          <Alert severity={alert.success ? "success" : "error"}>
            <AlertTitle>{alert.success ? "Success" : "Error"}</AlertTitle>
            {alert.message}
          </Alert>
          : <></>
        }
        {
          entryToAdd !== '' ?
            <EntryForm
              type={entryToAdd}
              cancel={() => setEntryToAdd('')}
              patientId={id ? id : ''}
              handleAlert={handleAlert}
            /> :
            <Grid container direction="row" sx={{ m: 1 }}>
              <Grid item>
                <Button onClick={() => setEntryToAdd('Hospital')}
                  variant="contained"
                  color="primary"
                  sx={{ m: 1 }}
                >
                  New Hospital Entry
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => setEntryToAdd('OccupationalHealthcare')}
                  variant="contained"
                  color="primary"
                  sx={{ m: 1 }}
                >
                  New Occupational Healthcare
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => setEntryToAdd('HealthCheck')}
                  variant="contained"
                  color="primary"
                  sx={{ m: 1 }}
                >
                  New Health Check Entry
                </Button>
              </Grid>
            </Grid>
        }
        <h3>entries</h3>
        {
          patient.entries.map((entry, i) => <EntryView key={i} entry={entry} />)
        }
      </Card>
    )
  } else {
    return <p>patient '{id}' not found</p>
  }
  
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
 
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientView />}/>
          </Routes>
        </Container>
      </Router>
      </LocalizationProvider>
    </div>
  );
};

export default App;
