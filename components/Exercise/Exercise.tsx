import { View } from 'react-native';
import { useState } from 'react';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import ExerciseProps from './interface/Exercise.interface';
import useSaveExercise from '@/hooks/useSaveExercise';

interface Props {
  exercise: ExerciseProps;
}

export default function Exercise({ exercise }: Props) {
  const { name, reps, weight, dateAchieved, variation } = exercise;
  const dateSplit = dateAchieved.split('/');
  const monthValue = dateSplit[0];
  const dayValue = dateSplit[1];
  const yearValue = dateSplit[2];

  const [tempWeight, setWeight] = useState(`${weight}`);
  const [tempReps, setReps] = useState(`${reps}`);
  const [day, setDay] = useState(dayValue);
  const [month, setMonth] = useState(monthValue);
  const [year, setYear] = useState(yearValue);
  const saveExercise = useSaveExercise();

  //Testing

  return (
    <View>
      <Card>
        <Card.Title
          title={name}
          subtitle={variation}
          titleStyle={{ textAlign: 'center' }}
          subtitleStyle={{ textAlign: 'center' }}
        />
        <Card.Content style={{ padding: 5 }}>
          <Text>Personal Record: </Text>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <TextInput
              style={{ flex: 1, marginRight: 10 }}
              label='Weight'
              value={tempWeight}
              onChangeText={(value) => {
                console.log(value);
                setWeight(value);
              }}
            />
            <TextInput
              style={{ flex: 1 }}
              label='Reps'
              value={tempReps}
              onChangeText={(value) => {
                setReps(`${value}`);
              }}
            />
          </View>
          <Text>Date achieved:</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <TextInput
              style={{ marginRight: 5, flex: 1 }}
              label='Month'
              value={month}
              defaultValue={monthValue}
              onChangeText={(value) => {
                console.log(value);
                setMonth(value);
              }}
            />
            <TextInput
              style={{ marginRight: 5, flex: 1 }}
              label='Day'
              value={day}
              defaultValue={dayValue}
              onChangeText={(value) => {
                console.log(value);
                setDay(value);
              }}
            />
            <TextInput
              style={{ flex: 1 }}
              label='Year'
              value={year}
              defaultValue={yearValue}
              onChangeText={(value) => {
                console.log(value);
                setYear(value);
              }}
            />
          </View>
          <Button
            onPress={() =>
              saveExercise({
                variation,
                name,
                weight: parseInt(tempWeight, 10),
                reps: parseInt(tempReps, 10),
                dateAchieved: `${day}/${month}/${year}`,
              })
            }
            mode='contained-tonal'>
            Save
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
