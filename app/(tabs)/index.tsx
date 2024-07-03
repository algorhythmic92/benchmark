import useAsyncStorageKeys from '@/hooks/useGetAllKeys';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import { PaperProvider } from 'react-native-paper';
import { useGetAllExercises } from '@/services/exercise/exercise.service';

export default function HomeScreen() {
  const { getAllExercises, exercises, loading, error } = useGetAllExercises();

  return (
    <PaperProvider>
      <ExerciseList
        exercises={exercises}
        isLoading={loading}
        error={error}
        getAllExercises={getAllExercises}
      />
    </PaperProvider>
  );
}
