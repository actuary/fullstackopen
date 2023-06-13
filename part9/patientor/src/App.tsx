import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { Female, Male, Transgender } from "@mui/icons-material";

import { apiBaseUrl } from "./constants";
import { Patient, Entry } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

interface EntryProps {
  entry: Entry;
}

const HospitalEntryView = ({ entry }: EntryProps) => (
  <>
    <p>{entry.date}<em> {entry.description}</em></p>
    {entry.diagnosisCodes ? 
      <ul>
        {
          entry.diagnosisCodes.map( (code) => <li>{code}</li>)
        }
      </ul>
      : null
    }
  </>
)

const HealthCheckEntryView = ({ entry }: EntryProps) => (
  <>
    <p>{entry.date}<em> {entry.description}</em></p>
    {entry.diagnosisCodes ? 
      <ul>
        {
          entry.diagnosisCodes.map( (code) => <li>{code}</li>)
        }
      </ul>
      : null
    }
  </>
)

const OccupationalHealthcareEntryView = ({ entry }: EntryProps) => (
  <>
    <p>{entry.date}<em> {entry.description}</em></p>
    {entry.diagnosisCodes ? 
      <ul>
        {
          entry.diagnosisCodes.map( (code) => <li>{code}</li>)
        }
      </ul>
      : null
    }
  </>
)

const EntryView = ({ entry }: EntryProps ) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryView entry={entry} />
    case 'HealthCheck':
      return <HealthCheckEntryView entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryView entry={entry} />
    default:
      return <>entry type not found.</>
  };
};

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    if (typeof id === 'string') {
      patientService.getById(id)
        .then(patient => setPatient(patient))
        .catch(err => setPatient(undefined));
    } else {
      setPatient(undefined);
    }
   
  }, [id]);

  if (patient) {
    return (
      <>
        <h2>{patient.name} {patient.gender === 'male' ? <Male /> : patient.gender === 'female' ? <Female /> : <Transgender />}</h2>
        <p>
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}
        </p>
        <h3>entries</h3>
        {
          patient.entries.map((entry, i) => <EntryView key={i} entry={entry} />)
        }
      </>
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
    </div>
  );
};

export default App;
