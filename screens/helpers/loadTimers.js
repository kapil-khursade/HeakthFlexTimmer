import AsyncStorage from '@react-native-async-storage/async-storage';

export default async(setTimerArr) => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      if (storedTimers !== null) {
        await setTimerArr(JSON.parse(storedTimers));
      }
    } catch (error) {
      console.error("Failed to load timers:", error);
    }
  };