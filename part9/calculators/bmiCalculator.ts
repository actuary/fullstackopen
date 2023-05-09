
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

console.log(calculateBMI(180, 74))
