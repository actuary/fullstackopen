interface ExerciseResults {
  days: number
  trainingDays: number
  targetHours: number
  averageTime: number
  targetReached: boolean
  rating: 1 | 2 | 3
  ratingExplanation: string
}

interface ExerciseInput {
  exerciseHours: number[]
  targetHours: number
}

export {}

const calculateExercises = (exerciseHours: number[], targetHours: number) : ExerciseResults => {
  console.log(exerciseHours)
  const days: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter((val) => val > 0).length;
  const averageTime: number = exerciseHours.reduce( (_, s) => _ + s, 0) / days;

  const totalTargetHours: number = targetHours * days;
  const targetReached: boolean = averageTime >= totalTargetHours;
  
  let rating: 1 | 2 | 3
  if (averageTime < 0.75 * totalTargetHours) {
    rating = 1;
  } else if (averageTime < 1.25 * totalTargetHours) {
    rating = 2;
  } else {
    rating = 3;
  }

  let ratingExplanation: string
  switch (rating) {
    case 1: ratingExplanation = 'lazybones'; break;
    case 2: ratingExplanation = 'not too bad but could be better'; break;
    case 3: ratingExplanation = 'wow'; break;
  }

  return {
    days,
    trainingDays,
    targetHours,
    averageTime,
    targetReached,
    rating,
    ratingExplanation
  };
}

const parseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) throw new Error(`target hours must be a number, got '${args[2]}'`)
  if (args.slice(3).some(hour => isNaN(Number(hour)))) throw new Error(`exercise hours must be numbers`)

  const targetHours: number = Number(args[2]);
  const exerciseHours: number[] = args.slice(3).map((hour) => Number(hour));
  return {
    targetHours,
    exerciseHours
  }
}



try {
  const { exerciseHours, targetHours } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, targetHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}