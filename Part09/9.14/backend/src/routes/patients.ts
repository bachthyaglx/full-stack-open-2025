import express from "express";
import patientsService from "../services/patientsService";
import { validateNewPatient } from "../utils/patientValidation";

const router = express.Router();

// Get patients (without ssn)
router.get("/", (_req, res) => {
  res.json(patientsService.getPatients());
});

// Add a new patient
router.post("/", (req, res) => {
  try {
    console.log("Received POST request:", req.body);

    // Validate request body using Zod
    const validationResult = validateNewPatient(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.errors });
    }

    // Data is valid, proceed with adding patient
    const newPatient = validationResult.data;
    const addedPatient = patientsService.addPatient(newPatient);

    return res.status(201).json(addedPatient);
  } catch (error) {
    console.error("Error in POST /api/patients:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
