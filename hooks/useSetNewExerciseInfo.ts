import EXERCISE_VARIATION from '@/constants/ExerciseVariations';
import { useState } from 'react';

export const useSetNewExerciseInfo = () => {
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseVariation, setNewExerciseVariation] =
    useState<EXERCISE_VARIATION>(EXERCISE_VARIATION.NONE);

  return {
    newExerciseName,
    newExerciseVariation,
    setNewExerciseName,
    setNewExerciseVariation,
  };
};
