import { useCallback } from 'react';
import ExerciseProps from '../components/Exercise/Exercise.interface';
import storage from '@/app/storage';

const saveExercise = (exerciseFormData: ExerciseProps) => {
  const {
    variation,
    name,
    personalRecord: { weight, reps },
    dateAchieved,
  } = exerciseFormData;

  storage.save({
    key: `${variation} ${name}`,
    data: {
      weight,
      reps,
      dateAchieved,
    },
    expires: null,
  });
};

const useSaveExercise = () => {
  return useCallback(saveExercise, []);
};

export default useSaveExercise;
