import { useCallback, useState } from 'react';
import { FlatList, View, ListRenderItem } from 'react-native';
import { Divider, Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Exercise from '@/components/Exercise/Exercise';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';
import useLoadExercises from '@/hooks/useLoadExercise';
import useAsyncStorageKeys from '@/hooks/useGetAllKeys';
import ExerciseModal from '../ExerciseModal.tsx/ExerciseModal';
import useSetVisibility from '@/hooks/useSetVisibility';
import { useSetNewExerciseInfo } from '@/hooks/useSetNewExerciseInfo';
import { unshiftArray } from '@/util/array';

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

const useExerciseListKeyExtractor = () => {
  const exerciseListKeyExtractor = useCallback(
    (item: ExerciseProps) => `${item.name}-${item.variation}`,
    []
  );
  return { exerciseListKeyExtractor };
};

export default function ExerciseList({ exercises }: Props) {
  const {
    keys,
    isLoading: areKeysLoading,
    error: keysError,
  } = useAsyncStorageKeys();
  const { data, isLoading, error } = useLoadExercises(keys);
  const [tempExercises, setTempExercises] = useState(exercises);
  const {
    newExerciseName,
    newExerciseVariation,
    setNewExerciseName,
    setNewExerciseVariation,
  } = useSetNewExerciseInfo();
  const {
    visible: isModalVisible,
    show: showModal,
    hide: hideModal,
  } = useSetVisibility();
  const { exerciseListKeyExtractor } = useExerciseListKeyExtractor();

  const addNewExercise = () => {
    console.log('tempExercises: ' + JSON.stringify(tempExercises));
    console.log('newExerciseVariation: ' + newExerciseVariation);
    console.log('newExerciseName: ' + newExerciseName);
    setTempExercises(
      unshiftArray(tempExercises, {
        variation: newExerciseVariation,
        name: newExerciseName,
        weight: 0,
        reps: 0,
        dateAchieved: '',
      })
    );
    hideModal();
  };

  if (isLoading || areKeysLoading) {
    console.log('Loading...');
  }

  if (error || keysError) {
    return <Text>Error: {error}</Text>;
  }

  console.log('Exercises: ' + JSON.stringify(data));

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <ExerciseModal
        visible={isModalVisible}
        hide={hideModal}
        newExerciseName={newExerciseName}
        newExerciseVariation={newExerciseVariation}
        setNewExerciseName={setNewExerciseName}
        setNewExerciseVariation={setNewExerciseVariation}
        addNewExercise={addNewExercise}
      />
      <View style={{ padding: 10 }}>
        <Button mode='outlined' onPress={showModal}>
          Add New Exercise
        </Button>
      </View>
      <Divider />
      <FlatList
        data={tempExercises}
        renderItem={renderExercise}
        keyExtractor={exerciseListKeyExtractor}
      />
    </SafeAreaView>
  );
}
