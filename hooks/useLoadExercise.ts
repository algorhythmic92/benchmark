import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';

const useLoadExercises = (keys: readonly string[]) => {
  const [data, setData] = useState<ExerciseProps[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exerciseMatrix = await AsyncStorage.multiGet(keys);
        const exercises = exerciseMatrix.map((exerciseMatrixCell) =>
          JSON.parse(exerciseMatrixCell[1] || '')
        );
        setData(exercises);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occured'
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadExercises();
  }, [keys]);

  return { data, isLoading, error };
};

export default useLoadExercises;
