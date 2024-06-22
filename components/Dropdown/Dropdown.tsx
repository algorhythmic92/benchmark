import useSetVisibility from '@/hooks/useSetVisibility';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, List, Button } from 'react-native-paper';

interface Props {
  label: string;
  options: string[];
  setDropdownSelection: Dispatch<SetStateAction<string>>;
}

function Dropdown<T>({ options, setDropdownSelection, label }: Props) {
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

  const menuItems = useMemo(() => {
    return options.map((option) => ({
      title: option,
      onPress: () => useMenuItem(option),
    }));
  }, [options, useMenuItem]);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeDropdown}
        anchor={
          <Button
            icon='chevron-down'
            mode='contained-tonal'
            onPress={openDropdown}>
            {label}
          </Button>
        }
        anchorPosition='bottom'
        style={style.fullWidth}>
        {menuItems.map(({ title, onPress }) => (
          <List.Item onPress={onPress} title={title} />
        ))}
      </Menu>
    </View>
  );
}

const style = StyleSheet.create({
  fullWidth: {
    width: '80%',
  },
});

export default Dropdown;
