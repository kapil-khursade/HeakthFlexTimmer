import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (updatedTimers) => {
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
    } catch (error) {
      console.error("Failed to save timers:", error);
    }
  };