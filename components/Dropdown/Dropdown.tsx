import EXERCISE_VARIATION from '@/constants/ExerciseVariations';
import { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button } from 'react-native-paper';

interface Props {
  options: string[];
}

const Dropdown = ({ options }: Props) => {
  const [visible, setVisible] = useState(false);
  const openDropDown = () => setVisible(true);
  const closeDropDown = () => setVisible(false);

  console.log('options: ' + options);
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeDropDown}
        anchor={
          <Button
            icon='chevron-down'
            mode='contained-tonal'
            onPress={openDropDown}
            style={{ width: 250 }}>
            Variation
          </Button>
        }>
        {options.map((option) => (
          <Menu.Item
            onPress={() => {
              console.log(`${option} pressed!`);
            }}
            title={option}
          />
        ))}
      </Menu>
    </View>
  );
};

export default Dropdown;
