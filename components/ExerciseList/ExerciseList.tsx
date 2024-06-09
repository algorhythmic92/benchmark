import { FlatList, View, ListRenderItem } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Exercise from '@/components/Exercise/Exercise';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';
import useLoadExercises from '@/hooks/useLoadExercise';
import useAsyncStorageKeys from '@/hooks/useGetAllKeys';

interface Props {
  exercises: ExerciseProps[];
}

export const renderExercise: ListRenderItem<ExerciseProps> = ({ item }) => (
  <View style={{ marginVertical: 10 }}>
    <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
      <Exercise exercise={item} />
    </View>
  </View>
);

export default function ExerciseList({ exercises }: Props) {
  const {
    keys,
    isLoading: areKeysLoading,
    error: keysError,
  } = useAsyncStorageKeys();
  const { data, isLoading, error } = useLoadExercises(keys);

  if (isLoading || areKeysLoading) {
    console.log('Loading...');
  }

  if (error || keysError) {
    return <Text>Error: {error}</Text>;
  }

  console.log('Exercises: ' + JSON.stringify(data));

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <FlatList data={exercises} renderItem={renderExercise} />
    </SafeAreaView>
  );
}
