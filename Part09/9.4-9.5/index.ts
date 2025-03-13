import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
const PORT = 3003;

// Define the /hello route
app.get("/hello", (_req: Request, res: Response): void => {
  res.send("Hello Full Stack!");
});

// Define the /bmi route
app.get("/bmi", (req: Request, res: Response): void => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // Validate parameters
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  // Respond with BMI calculation
  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
