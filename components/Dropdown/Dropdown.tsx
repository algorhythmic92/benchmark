import useSetVisibility from '@/hooks/useShowHideComponent';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Button } from 'react-native-paper';

interface Props {
  options: string[];
  setDropdownSelection: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({ options, setDropdownSelection }: Props) => {
  const {
    visible,
    show: openDropdown,
    hide: closeDropdown,
  } = useSetVisibility();

  const useMenuItem = useCallback(
    (option: string) => {
      setDropdownSelection(option);
      closeDropdown();
    },
    [setDropdownSelection, closeDropdown]
  );

  const menuItems = useMemo(
    () =>
      options.map((option) => ({
        title: option,
        onPress: () => useMenuItem(option),
      })),
    [options, useMenuItem]
  );

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeDropdown}
        anchor={
          <Button
            icon='chevron-down'
            mode='contained-tonal'
            onPress={openDropdown}
            style={style.menuWidth}>
            Variation
          </Button>
        }
        anchorPosition='bottom'
        contentStyle={style.menuWidth}>
        {menuItems.map(({ title, onPress }) => (
          <Menu.Item onPress={onPress} title={title} />
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
