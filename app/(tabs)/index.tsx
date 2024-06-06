import { Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import EXERCISE_VARIATIONS from '@/constants/ExerciseVariations';

const { BARBELL, DUMBBELL, CABLE } = EXERCISE_VARIATIONS;

const exercises = [
  {
    name: 'Flat Bench Press',
    variation: DUMBBELL,
    personalRecord: {
      reps: 6,
      weight: 100,
    },
    dateAchieved: '11/20/2024',
  },
  {
    name: 'Flat Bench Press',
    variation: BARBELL,
    personalRecord: {
      reps: 6,
      weight: 245,
    },
    dateAchieved: '03/27/2024',
  },
  {
    name: 'Squats',
    variation: BARBELL,
    personalRecord: {
      reps: 10,
      weight: 195,
    },
    dateAchieved: '02/07/2023',
  },
  {
    name: 'Bicep Curl',
    variation: DUMBBELL,
    personalRecord: {
      reps: 10,
      weight: 35,
    },
    dateAchieved: '04/14/2024',
  },
];

export default function HomeScreen() {
  return <ExerciseList exercises={exercises} />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
