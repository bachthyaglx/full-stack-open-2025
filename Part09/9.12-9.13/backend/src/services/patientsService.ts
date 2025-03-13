import { v1 as uuid } from "uuid";
import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';

// Function to return all patients excluding 'ssn'
const getPatients = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// Add a new patient
const addPatient = (newPatient: NewPatient): PublicPatient => {
  const id = uuid();
  const addedPatient: Patient = { id, ...newPatient };
  patientsData.push(addedPatient);
  return { id, name: newPatient.name, dateOfBirth: newPatient.dateOfBirth, gender: newPatient.gender, occupation: newPatient.occupation };
};

export default { getPatients, addPatient };
