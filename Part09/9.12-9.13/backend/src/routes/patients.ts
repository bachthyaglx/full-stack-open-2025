import express from "express";
import patientsService from "../services/patientsService";
import { NewPatient } from "../types";

const router = express.Router();

// Get patients (without ssn)
router.get("/", (_req, res) => {
  res.json(patientsService.getPatients());
});

// Add a new patient
router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPatient: NewPatient = { name, dateOfBirth, ssn, gender, occupation };
    const addedPatient = patientsService.addPatient(newPatient);

    return res.status(201).json(addedPatient);
  } catch (error) {
    console.error("Error adding patient:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
