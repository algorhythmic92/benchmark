import EXERCISE_VARIATION from '@/constants/ExerciseVariations';

export default interface Exercise {
  name: string;
  variation: EXERCISE_VARIATION;
  reps: number;
  weight: number;
  dateAchieved: string;
}
