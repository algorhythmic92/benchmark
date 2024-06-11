import { useState } from 'react';
import { FlatList, View, ListRenderItem } from 'react-native';
import {
  Divider,
  Text,
  Button,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Exercise from '@/components/Exercise/Exercise';
import ExerciseProps from '@/components/Exercise/interface/Exercise.interface';
import useLoadExercises from '@/hooks/useLoadExercise';
import useAsyncStorageKeys from '@/hooks/useGetAllKeys';
import Dropdown from '../Dropdown/Dropdown';
import EXERCISE_VARIATION from '@/constants/ExerciseVariations';

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
  const [tempExercises, setTempExercises] = useState(exercises);
  const [modalVisible, setModalVisible] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseVariation, setNewExerciseVariation] =
    useState<EXERCISE_VARIATION>();

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const addNewExercise = () =>
    setTempExercises(
      unshiftArray(tempExercises, {
        variation: newExerciseVariation ?? EXERCISE_VARIATION.NONE,
        name: newExerciseName,
        weight: 0,
        reps: 0,
        dateAchieved: '',
      })
    );

  if (isLoading || areKeysLoading) {
    console.log('Loading...');
  }

  if (error || keysError) {
    return <Text>Error: {error}</Text>;
  }

  const unshiftArray = (arr: ExerciseProps[], newElement: ExerciseProps) => {
    arr.unshift(newElement);
    return arr;
  };

  console.log('Exercises: ' + JSON.stringify(data));

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          style={{ padding: 20 }}
          contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Dropdown
              options={Object.values(EXERCISE_VARIATION)}
              setDropdownSelection={setNewExerciseVariation}
            />
          </View>
          <TextInput
            mode='outlined'
            label='Name'
            value={newExerciseName}
            onChangeText={setNewExerciseName}
          />
          <Button>Save</Button>
        </Modal>
      </Portal>
      <View style={{ padding: 10 }}>
        <Button mode='outlined' onPress={showModal}>
          Add New Exercise
        </Button>
      </View>
      <Divider />
      <FlatList data={tempExercises} renderItem={renderExercise} />
    </SafeAreaView>
  );
}
