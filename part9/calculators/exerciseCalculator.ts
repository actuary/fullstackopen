interface ExerciseResults {
  days: number
  trainingDays: number
  targetHours: number
  averageTime: number
  targetReached: boolean
  rating: 1 | 2 | 3
  ratingExplanation: string
}

const calculateExercises = (exerciseHours: number[], targetHours: number) : ExerciseResults => {
  const days: number = exerciseHours.length
  const trainingDays: number = exerciseHours.filter((val) => val > 0).length
  const averageTime: number = exerciseHours.reduce( (_, s) => _ + s, 0) / days 

  const totalTargetHours: number = targetHours * days
  const targetReached: boolean = averageTime >= totalTargetHours
  
  let rating: 1 | 2 | 3
  if (averageTime < 0.75 * totalTargetHours) {
    rating = 1
  } else if (averageTime < 1.25 * totalTargetHours) {
    rating = 2
  } else {
    rating = 3
  }

  let ratingExplanation: string
  switch (rating) {
    case 1: ratingExplanation = 'lazybones'
    case 2: ratingExplanation = 'not too bad but could be better'
    case 3: ratingExplanation = 'wow'
  }

  return {
    days,
    trainingDays,
    targetHours,
    averageTime,
    targetReached,
    rating,
    ratingExplanation
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))