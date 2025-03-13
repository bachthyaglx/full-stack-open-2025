interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
  
const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hours => hours > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;

    if (average >= target) {
        rating = 3;
        ratingDescription = "Great job! You've met or exceeded your target.";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "Not too bad but could be better.";
    } else {
        rating = 1;
        ratingDescription = "Needs improvement. Try to be more consistent.";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// Function to parse command-line arguments
const parseExerciseArguments = (): void => {
const args = process.argv.slice(2);

if (args.length < 2) {
    console.log("Usage: npm run calculateExercises <target> <hours...>");
    process.exit(1);
}

const target = Number(args[0]);
const dailyHours = args.slice(1).map(Number);

if (isNaN(target) || dailyHours.some(isNaN)) {
    console.log("Error: All inputs must be numbers.");
    process.exit(1);
}

console.log(calculateExercises(dailyHours, target));
};

// Only execute if this file is run directly
if (require.main === module) {
    parseExerciseArguments();
}
  