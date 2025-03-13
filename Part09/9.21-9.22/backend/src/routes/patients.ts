import express from "express";
import patientsService from "../services/patientsService";
import { validateNewPatient } from "../utils/patientValidation";
import { Gender, NewPatient } from '../types';

const router = express.Router();

// Get patients (without ssn)
router.get("/", (_req, res) => {
  res.json(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

// Add a new patient
router.post("/", (req, res) => {
  try {
    const validationResult = validateNewPatient(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.errors });
    }

    // Explicitly convert gender to Gender enum type
    const newPatient: NewPatient = {
      ...validationResult.data,
      gender: validationResult.data.gender as Gender,  // <-- THIS FIXES THE ISSUE
    };

    const addedPatient = patientsService.addPatient(newPatient);

    return res.status(201).json(addedPatient);
  } catch (error) {
    console.error("Error in POST /api/patients:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
