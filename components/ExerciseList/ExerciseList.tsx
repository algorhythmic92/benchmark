import { useState } from 'react';
import { FlatList, View, ListRenderItem } from 'react-native';
import { Divider, Text, Button, Portal, Modal } from 'react-native-paper';
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
  const [tempExercises, setTempExercises] = useState(exercises);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

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
          <Text>Example Modal. Click outside this area to dismiss.</Text>
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
