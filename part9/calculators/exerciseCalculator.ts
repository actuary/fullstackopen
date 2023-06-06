interface ExerciseResults {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingExplanation: string
  target: number,
  average: number
}

interface ExerciseInput {
  exerciseHours: number[]
  targetHours: number
}

export {};

export const calculateExercises = (exerciseHours: number[], targetHours: number) : ExerciseResults => {
  console.log(exerciseHours);
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter((val) => val > 0).length;
  const average: number = exerciseHours.reduce( (_, s) => _ + s, 0) / periodLength;

  const totalTargetHours: number = targetHours * periodLength;
  const success: boolean = average >= totalTargetHours;
  
  let rating: 1 | 2 | 3;
  if (average < 0.75 * totalTargetHours) {
    rating = 1;
  } else if (average < 1.25 * totalTargetHours) {
    rating = 2;
  } else {
    rating = 3;
  }

  let ratingExplanation: string;
  switch (rating) {
    case 1: ratingExplanation = 'lazybones'; break;
    case 2: ratingExplanation = 'not too bad but could be better'; break;
    case 3: ratingExplanation = 'wow'; break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingExplanation,
    target: targetHours,
    average
  };
};

export const parseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) throw new Error(`target hours must be a number, got '${args[2]}'`);
  if (args.slice(3).some(hour => isNaN(Number(hour)))) throw new Error(`exercise hours must be numbers`);

  const targetHours = Number(args[2]);
  const exerciseHours: number[] = args.slice(3).map((hour) => Number(hour));
  return {
    targetHours,
    exerciseHours
  };
};