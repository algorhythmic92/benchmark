import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Button } from 'react-native-paper';

interface Props {
  options: string[];
}

const Dropdown = ({ options }: Props) => {
  const [visible, setVisible] = useState(false);
  const openDropDown = () => setVisible(true);
  const closeDropDown = () => setVisible(false);

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
            style={style.menuWidth}>
            Variation
          </Button>
        }
        anchorPosition='bottom'
        contentStyle={style.menuWidth}>
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

const style = StyleSheet.create({
  menuWidth: {
    width: 200,
  },
});

export default Dropdown;
