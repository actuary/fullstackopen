interface HealthInformation {
  height: number
  weight: number
}

export {}

const calculateBMI = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100.0) ** 2);

  if (bmi < 16.0) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal Range"
  } else if (bmi < 30) {
    return "Overweight"
  }

  return "Obese"
}

const parseArguments = (args: string[]): HealthInformation => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBMI(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}