import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, ListRenderItem } from 'react-native';
import { Divider, Text, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Exercise from '@/components/Exercise/Exercise';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';
import ExerciseModal from '../ExerciseModal.tsx/ExerciseModal';
import useSetVisibility from '@/hooks/useSetVisibility';
import { useSetNewExerciseInfo } from '@/hooks/useSetNewExerciseInfo';
import { unshiftArray } from '@/util/array';
import ErrorComponent from '../Error/Error';

interface Props {
  exercises: ExerciseProps[];
  error: string | null;
  isLoading: boolean;
  getAllExercises: () => {};
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

export default function ExerciseList({
  exercises,
  isLoading,
  error,
  getAllExercises,
}: Props) {
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
    setTempExercises(
      unshiftArray(tempExercises, {
        id: null,
        variation: newExerciseVariation,
        name: newExerciseName,
        weight: 0,
        reps: 0,
        dateAchieved: '',
      })
    );
    hideModal();
  };

  useEffect(() => {
    setTempExercises(exercises);
  }, [exercises]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <ErrorComponent
        message={error}
        onRetry={() => {
          // fetchData
          getAllExercises();
        }}
      />
    );
  }

  console.log('error: ' + error);

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
