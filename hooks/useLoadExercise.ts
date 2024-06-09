import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';

const useLoadExercises = (keys: readonly string[]) => {
  const [data, setData] = useState<ExerciseProps[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exerciseMatrix = await AsyncStorage.multiGet(keys);
        const exercises = exerciseMatrix.map((exerciseMatrixCell) =>
          JSON.parse(exerciseMatrixCell[1] || '')
        );
        setData(exercises);
      } catch (err: any) {
        console.log('Error loading exercises');
        setError(err.message);
      } finally {
        console.log('Finished loading exercises');
        setIsLoading(false);
      }
    };
    loadExercises();
  }, [keys]);

  return { data, isLoading, error };
};

export default useLoadExercises;
