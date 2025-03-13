import patientsData from '../../data/patients';
import { PublicPatient } from '../types';

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

export default { getPatients };
