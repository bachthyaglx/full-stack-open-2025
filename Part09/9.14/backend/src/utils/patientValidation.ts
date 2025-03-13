import { z } from "zod";

// Zod schema for validating new patient data
const newPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string().min(1, "Occupation is required"),
});

// TypeScript type from schema
export type NewPatient = z.infer<typeof newPatientSchema>;

export const validateNewPatient = (data: unknown) => {
  return newPatientSchema.safeParse(data);
};
