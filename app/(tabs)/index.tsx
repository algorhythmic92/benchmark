import ExerciseList from '../../components/ExerciseList/ExerciseList';
import EXERCISE_VARIATION from '@/constants/ExerciseVariations';
import { PaperProvider } from 'react-native-paper';

const exercises = [
  {
    name: 'Flat Bench Press',
    variation: EXERCISE_VARIATION.DUMBBELL,
    reps: 6,
    weight: 100,
    dateAchieved: '11/20/2024',
  },
  {
    name: 'Flat Bench Press',
    variation: EXERCISE_VARIATION.BARBELL,
    reps: 6,
    weight: 245,
    dateAchieved: '03/27/2024',
  },
  {
    name: 'Squats',
    variation: EXERCISE_VARIATION.BARBELL,
    reps: 10,
    weight: 195,
    dateAchieved: '02/07/2023',
  },
  {
    name: 'Bicep Curl',
    variation: EXERCISE_VARIATION.DUMBBELL,
    reps: 10,
    weight: 35,
    dateAchieved: '04/14/2024',
  },
];

export default function HomeScreen() {
  return (
    <PaperProvider>
      <ExerciseList exercises={exercises} />
    </PaperProvider>
  );
}
