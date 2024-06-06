import { FlatList, View, ListRenderItem } from 'react-native';
import { Divider } from 'react-native-paper';
import Exercise from '../Exercise/Exercise';
import ExerciseProps from '../Exercise/Exercise.interface';

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
  return (
    <View style={{ padding: 10 }}>
      <FlatList data={exercises} renderItem={renderExercise} />
    </View>
  );
}
