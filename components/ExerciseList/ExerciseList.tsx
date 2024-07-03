import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, Text, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Exercise from '@/components/Exercise/Exercise';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';
import ExerciseModal from '../ExerciseModal.tsx/ExerciseModal';
import useSetVisibility from '@/hooks/useSetVisibility';
import { useSetNewExerciseInfo } from '@/hooks/useSetNewExerciseInfo';
import ErrorComponent from '../Error/Error';
import {
  useCreateExercise,
  useUpdateExercise,
} from '@/services/exercise/exercise.service';

interface Props {
  exercises: ExerciseProps[];
  error: string | null;
  isLoading: boolean;
  getAllExercises: () => {};
}

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
  const {
    createExercise,
    loading: createExerciseLoading,
    error: createExerciseError,
  } = useCreateExercise();
  const {
    updateExercise,
    loading: updateExerciseLoading,
    error: updateExerciseError,
  } = useUpdateExercise();

  const addNewExercise = useCallback(() => {
    createExercise({
      id: null,
      variation: newExerciseVariation,
      name: newExerciseName,
      weight: 0,
      reps: 0,
      dateAchieved: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    });
    getAllExercises();
    hideModal();
  }, []);

  const saveExercise = useCallback(
    (exercise: ExerciseProps) => {
      updateExercise(exercise);
      getAllExercises();
    },
    [updateExercise]
  );

  useEffect(() => {
    getAllExercises();
  }, []);

  if (isLoading || createExerciseLoading || updateExerciseLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  if (error || createExerciseError || updateExerciseError) {
    return (
      <ErrorComponent
        message={error || createExerciseError || updateExerciseError}
        onRetry={() => {
          // fetchData
          getAllExercises();
        }}
      />
    );
  }

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
      {exercises?.length ? (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                <Exercise exercise={item} updateExercise={saveExercise} />
              </View>
            </View>
          )}
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
