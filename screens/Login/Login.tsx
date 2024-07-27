import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Icon, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

function Login({}) {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const onChangeUsernameText = useCallback((text: string) => {
    setUsername(text);
  }, []);
  const onChangePasswordText = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const theme = useTheme();

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View style={{ alignSelf: 'center' }}>
        <Icon source='weight-lifter' color={theme.colors.primary} size={160} />
      </View>
      <View style={{ padding: 20 }}>
        <TextInput
          mode='outlined'
          autoCapitalize='none'
          style={{ marginBottom: 10 }}
          label='Username'
          value={username || ''}
          onChangeText={onChangeUsernameText}
        />
        <TextInput
          mode='outlined'
          secureTextEntry={true}
          autoCapitalize='none'
          style={{ marginBottom: 10 }}
          label='Password'
          value={password || ''}
          onChangeText={onChangePasswordText}
        />
        <Button mode='contained'>
          <Text>Login</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Login;
