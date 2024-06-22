import {
  Button,
  Modal,
  Portal,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import EXERCISE_VARIATION from '@/constants/ExerciseVariations';

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
        style={{ padding: 10 }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 5,
        }}>
        <SegmentedButtons
          value={newExerciseVariation}
          onValueChange={setNewExerciseVariation}
          style={{ marginBottom: 10 }}
          buttons={Object.values(EXERCISE_VARIATION).map((variation) => ({
            value: variation,
            label: variation,
          }))}
        />
        <TextInput
          style={{ marginBottom: 10 }}
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

export default ExerciseModal;
