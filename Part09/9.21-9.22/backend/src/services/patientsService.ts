import { v1 as uuid } from "uuid";
import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NonSensitivePatient } from '../types';

// Function to return all patients excluding 'ssn'
const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// Function to return a specific patient by id
const findById = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
};

// Add a new patient
const addPatient = (newPatient: NewPatient): PublicPatient => {
  const id = uuid();
  const patientToAdd: Patient = {
    id,
    ...newPatient,
  };

  patientsData.push(patientToAdd);

  // Only omit ssn, keep entries
  const { ssn, ...publicPatient } = patientToAdd;
  return publicPatient;
};

export default { getPatients, findById, addPatient };
