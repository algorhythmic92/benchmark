import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Text,
  TextInput,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import ExerciseProps from './interface/Exercise.interface';
import ExerciseInterface from './interface/Exercise.interface';

interface Props {
  exercise: ExerciseProps;
  updateExercise: (exercise: ExerciseInterface) => void;
  deleteExercise: (id: number | null) => void;
}

export default function ExerciseCard({
  exercise,
  updateExercise,
  deleteExercise,
}: Props) {
  const { id, name, reps, weight, dateAchieved, variation } = exercise;

  const [tempWeight, setWeight] = useState(`${weight}`);
  const [tempReps, setReps] = useState(`${reps}`);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const dateSplit = dateAchieved.split('/');
    setMonth(dateSplit[0]);
    setDay(dateSplit[1]);
    setYear(dateSplit[2]);
  }, [dateAchieved]);

  useEffect(() => {
    setWeight(`${weight}`);
    setReps(`${reps}`);
  }, [weight, reps]);

  const onPressSave = useCallback(() => {
    updateExercise({
      id,
      name,
      variation,
      weight: parseInt(tempWeight, 10),
      reps: parseInt(tempReps, 10),
      dateAchieved: `${month}/${day}/${year}`,
    });
  }, [
    tempReps,
    tempWeight,
    day,
    month,
    year,
    id,
    name,
    variation,
    updateExercise,
  ]);

  const onPressDelete = useCallback(() => {
    deleteExercise(id);
  }, [id, deleteExercise]);

  return (
    <View>
      <Card>
        <Card.Title
          title={name}
          subtitle={variation}
          titleStyle={{ textAlign: 'center' }}
          subtitleStyle={{ textAlign: 'center' }}
          style={{ paddingLeft: 0 }}
          left={() => <View style={{ width: 0, height: 0 }}></View>}
          right={() => (
            <IconButton
              icon='minus-circle'
              iconColor={MD3Colors.error50}
              size={20}
              onPress={onPressDelete}
            />
          )}
        />
        <Card.Content style={{ padding: 5 }}>
          <Text>Personal Record: </Text>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <TextInput
              key={`${name}-weight`}
              mode='outlined'
              style={{ flex: 1, marginRight: 10 }}
              label='Weight'
              value={tempWeight}
              onChangeText={(value) => {
                setWeight(value);
              }}
            />
            <TextInput
              key={`${name}-reps`}
              mode='outlined'
              style={{ flex: 1 }}
              label='Reps'
              value={tempReps}
              onChangeText={(value) => {
                setReps(value);
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
              key={`${name}-month`}
              mode='outlined'
              style={{ marginRight: 5, flex: 1 }}
              label='Month'
              value={month}
              onChangeText={(value) => {
                setMonth(value);
              }}
            />
            <TextInput
              key={`${name}-day`}
              mode='outlined'
              style={{ marginRight: 5, flex: 1 }}
              label='Day'
              value={day}
              onChangeText={(value) => {
                setDay(value);
              }}
            />
            <TextInput
              key={`${name}-year`}
              mode='outlined'
              style={{ flex: 1 }}
              label='Year'
              value={year}
              onChangeText={(value) => {
                setYear(value);
              }}
            />
          </View>
          <Button onPress={onPressSave} mode='contained-tonal'>
            Save
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
