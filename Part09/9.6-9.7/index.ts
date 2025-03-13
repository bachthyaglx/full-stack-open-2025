import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
const PORT = 3003;

// Middleware to parse JSON request body
app.use(express.json());

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

// Define the /exercises route
app.post("/exercises", (req: Request, res: Response): void => {
  console.log("Received request body:", req.body); // 🔍 Debugging

  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    console.log("⚠️ Missing parameters in request body");
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    typeof target !== "number" ||
    daily_exercises.some((h) => typeof h !== "number")
  ) {
    console.log("⚠️ Malformatted parameters detected");
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
