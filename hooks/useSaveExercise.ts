import { useCallback } from 'react';
import ExerciseProps from '../components/Exercise/interface/Exercise.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveExercise = async (exercise: ExerciseProps) => {
  const { variation, name } = exercise;
  try {
    await AsyncStorage.setItem(
      `${variation} ${name}`,
      JSON.stringify(exercise)
    );
  } catch (err) {
    console.warn(`Error saving ${variation} ${name}`);
  }
};

const useSaveExercise = () => {
  return useCallback(saveExercise, []);
};

export default useSaveExercise;
