import useAsyncStorageKeys from '@/hooks/useGetAllKeys';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import { PaperProvider } from 'react-native-paper';
import useLoadExercises from '@/hooks/useLoadExercise';

export default function HomeScreen() {
  const {
    keys,
    isLoading: areKeysLoading,
    error: keysError,
  } = useAsyncStorageKeys();
  const { data, isLoading, error } = useLoadExercises(keys);
  console.log('data: ', JSON.stringify(data));
  return (
    <PaperProvider>
      <ExerciseList
        exercises={data?.length ? data : []}
        isLoading={isLoading || areKeysLoading}
        error={error || keysError}
      />
    </PaperProvider>
  );
}
