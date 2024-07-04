import ExerciseList from '../../components/ExerciseList/ExerciseList';
import { PaperProvider } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <PaperProvider>
      <ExerciseList />
    </PaperProvider>
  );
}
