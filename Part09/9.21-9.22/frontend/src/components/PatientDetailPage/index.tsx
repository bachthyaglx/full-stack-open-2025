// src/components/PatientDetailPage/index.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient, Gender } from '../../types';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading patient details...</div>;

  const genderIcon = {
    [Gender.Male]: '♂️',
    [Gender.Female]: '♀️',
    [Gender.Other]: '⚧️',
  }[patient.gender];

  return (
    <div>
      <h2>{patient.name} {genderIcon}</h2>
      <p><strong>ssn:</strong> {patient.ssn}</p>
      <p><strong>occupation:</strong> {patient.occupation}</p>
    </div>
  );
};

export default PatientDetailPage;
