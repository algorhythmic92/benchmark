import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Divider,
  Text,
  Button,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseCard from '@/components/Exercise/ExerciseCard';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';
import ExerciseModal from '../ExerciseModal.tsx/ExerciseModal';
import useSetVisibility from '@/hooks/useSetVisibility';
import { useSetNewExerciseInfo } from '@/hooks/useSetNewExerciseInfo';
import ErrorComponent from '../Error/Error';
import {
  useCreateExercise,
  useUpdateExercise,
  useGetAllExercises,
  useDeleteExercise,
} from '@/services/exercise/exercise.service';

const useExerciseListKeyExtractor = () => {
  const exerciseListKeyExtractor = useCallback(
    (item: ExerciseProps) => `${item.name}-${item.variation}`,
    []
  );
  return { exerciseListKeyExtractor };
};

export default function ExerciseList() {
  const {
    exercises: fetchedExercises,
    loading: fetching,
    error: fetchError,
    getAllExercises,
  } = useGetAllExercises();

  const [exercises, setExercises] = useState(fetchedExercises);
  const [isLoading, setIsLoading] = useState(fetching);
  const [error, setError] = useState(fetchError);

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
  const {
    deleteExercise,
    loading: deleteExerciseLoading,
    error: deleteExerciseError,
    deleted,
  } = useDeleteExercise();

  useEffect(() => {
    getAllExercises();
  }, []);

  useEffect(() => {
    if (!fetching && !fetchError) {
      setExercises(fetchedExercises);
    }
    setIsLoading(fetching);
    setError(fetchError);
  }, [fetching, fetchedExercises, fetchError]);

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
    }).then(() => {
      getAllExercises();
      hideModal();
    });
  }, [
    createExercise,
    newExerciseName,
    newExerciseVariation,
    getAllExercises,
    hideModal,
  ]);

  const removeExercise = useCallback(
    (id: number | null) => {
      deleteExercise(id).then(() => {
        getAllExercises();
      });
    },
    [deleteExercise, getAllExercises]
  );

  const saveExercise = useCallback(
    (exercise: ExerciseProps) => {
      updateExercise(exercise).then(() => {
        getAllExercises();
      });
    },
    [updateExercise, getAllExercises]
  );

  if (
    isLoading ||
    createExerciseLoading ||
    updateExerciseLoading ||
    deleteExerciseLoading
  ) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  if (
    error ||
    createExerciseError ||
    updateExerciseError ||
    deleteExerciseError
  ) {
    return (
      <ErrorComponent
        message={error || createExerciseError || updateExerciseError}
        onRetry={getAllExercises}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExerciseModal
        visible={isModalVisible}
        hide={hideModal}
        newExerciseName={newExerciseName}
        newExerciseVariation={newExerciseVariation}
        setNewExerciseName={setNewExerciseName}
        setNewExerciseVariation={setNewExerciseVariation}
        addNewExercise={addNewExercise}
      />
      <View style={styles.addNewExerciseContainer}>
        <Button mode='contained' onPress={showModal}>
          Add New Exercise
        </Button>
      </View>
      <Divider />
      {exercises?.length ? (
        <FlatList
          data={exercises.slice().reverse()}
          renderItem={({ item }) => (
            <View style={styles.exerciseCardContainer}>
              <ExerciseCard
                exercise={item}
                updateExercise={saveExercise}
                deleteExercise={removeExercise}
              />
            </View>
          )}
          keyExtractor={exerciseListKeyExtractor}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>
            You don't have any exercises saved.
          </Text>
          <Text style={styles.emptyContainerCallToActionText}>
            Use the button above to add some!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addNewExerciseContainer: { padding: 10 },
  container: { padding: 10 },
  emptyContainer: { height: '100%', justifyContent: 'center' },
  emptyContainerCallToActionText: { textAlign: 'center', fontSize: 16 },
  emptyContainerText: { textAlign: 'center', fontSize: 16, marginBottom: 10 },
  exerciseCardContainer: { marginVertical: 20, paddingHorizontal: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
