import storage from '@/app/storage';
import { useCallback } from 'react';

const loadExercise = async (name: string, variation: string) => {
  try {
    const exercise = await storage.load({
      key: `${variation} ${name}`,
      autoSync: true,
      syncInBackground: true,
    });
    return exercise;
  } catch (err: any) {
    console.warn(
      `Error retrieving exercise data from AsyncStorage: \n${err.message}`
    );
    return null;
  }
};

const useLoadExercise = () => {
  return useCallback(loadExercise, []);
};

export default useLoadExercise;
