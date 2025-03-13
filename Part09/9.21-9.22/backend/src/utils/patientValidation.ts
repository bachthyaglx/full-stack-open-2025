import { z } from "zod";

const newPatientSchema = z.object({
  ssn: z.string(),
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  entries: z.array(z.object({})).default([]), // explicitly default empty array
});

export const validateNewPatient = (data: unknown) => {
  return newPatientSchema.safeParse(data);
};

// TypeScript type from schema
export type NewPatient = z.infer<typeof newPatientSchema>;
