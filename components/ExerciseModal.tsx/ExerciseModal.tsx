import {
  Button,
  Modal,
  Portal,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import EXERCISE_VARIATION from '@/constants/ExerciseVariations';
import { StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  hide: () => void;
  newExerciseName: string;
  newExerciseVariation: string;
  setNewExerciseName: React.Dispatch<React.SetStateAction<string>>;
  setNewExerciseVariation: React.Dispatch<React.SetStateAction<string>>;
  addNewExercise: () => void;
}

const ExerciseModal = ({
  addNewExercise,
  visible,
  hide,
  newExerciseName,
  newExerciseVariation,
  setNewExerciseName,
  setNewExerciseVariation,
}: Props) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hide}
        style={styles.modal}
        contentContainerStyle={styles.modalContentContainerStyle}>
        <SegmentedButtons
          value={newExerciseVariation}
          onValueChange={setNewExerciseVariation}
          style={styles.segmentedButtons}
          buttons={Object.values(EXERCISE_VARIATION).map((variation) => ({
            value: variation,
            label: variation,
          }))}
        />
        <TextInput
          style={styles.newExerciseTextInput}
          mode='outlined'
          label='Name'
          value={newExerciseName}
          onChangeText={setNewExerciseName}
        />
        <Button mode='contained-tonal' onPress={addNewExercise}>
          Save
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: { padding: 10 },
  modalContentContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  newExerciseTextInput: { marginBottom: 10 },
  segmentedButtons: { marginBottom: 10 },
});

export default ExerciseModal;
