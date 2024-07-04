import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const useAsyncStorageKeys = () => {
  const [keys, setKeys] = useState<readonly string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        setKeys(allKeys);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeys();
  }, []);

  return { keys, isLoading, error };
};

export default useAsyncStorageKeys;
