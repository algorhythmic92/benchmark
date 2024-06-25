import EXERCISE_VARIATION from '@/constants/ExerciseVariations';

export default interface Exercise {
  name: string;
  variation: string;
  reps: number;
  weight: number;
  dateAchieved: string;
}
