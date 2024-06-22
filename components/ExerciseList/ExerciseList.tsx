import { useCallback, useEffect, useState } from 'react';
import { FlatList, View, ListRenderItem } from 'react-native';
import { Divider, Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Exercise from '@/components/Exercise/Exercise';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';
import ExerciseModal from '../ExerciseModal.tsx/ExerciseModal';
import useSetVisibility from '@/hooks/useSetVisibility';
import { useSetNewExerciseInfo } from '@/hooks/useSetNewExerciseInfo';
import { unshiftArray } from '@/util/array';

interface Props {
  exercises: ExerciseProps[];
  error: string;
  isLoading: boolean;
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

export default function ExerciseList({ exercises, isLoading, error }: Props) {
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

  if (isLoading) {
    console.log('Loading...');
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  useEffect(() => {
    setTempExercises(exercises);
  }, [tempExercises, setTempExercises]);

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
      {tempExercises?.length ? (
        <FlatList
          data={tempExercises}
          renderItem={renderExercise}
          keyExtractor={exerciseListKeyExtractor}
        />
      ) : (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>
            You don't have any exercises saved.
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            Use the button above to add some!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
