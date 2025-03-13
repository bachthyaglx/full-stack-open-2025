const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);
  
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal range';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obese';
  };
  
  // Function to parse command-line arguments
  const parseBmiArguments = (): void => {
    const args = process.argv.slice(2);
  
    if (args.length !== 2) {
      console.log("Usage: npm run calculateBmi <height in cm> <weight in kg>");
      process.exit(1);
    }
  
    const height = Number(args[0]);
    const weight = Number(args[1]);
  
    if (isNaN(height) || isNaN(weight)) {
      console.log("Error: Height and weight must be numbers.");
      process.exit(1);
    }
  
    console.log(calculateBmi(height, weight));
  };
  
  // Only execute if this file is run directly
  if (require.main === module) {
    parseBmiArguments();
  }
  