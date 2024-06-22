import EXERCISE_VARIATION from '@/constants/ExerciseVariations';
import { useState } from 'react';

export const useSetNewExerciseInfo = () => {
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseVariation, setNewExerciseVariation] = useState('');

  return {
    newExerciseName,
    newExerciseVariation,
    setNewExerciseName,
    setNewExerciseVariation,
  };
};
