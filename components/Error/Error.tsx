import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';

interface ErrorComponentProps {
  message: string | null;
  onRetry: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <IconButton icon='alert-circle-outline' size={60} iconColor='#f44336' />
      <Text style={styles.message}>{message}</Text>
      <Button
        mode='contained'
        onPress={onRetry}
        style={styles.button}
        buttonColor='#f44336'>
        Try Again
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#f44336',
  },
  button: {
    marginTop: 10,
  },
});

export default ErrorComponent;
