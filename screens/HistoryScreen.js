import { View, Text, useColorScheme, StyleSheet  } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import HomeScreenStyle from '../styleSheets/ScreenStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const HistoryScreen = () => {
  const [CompletedTimerArr, setCompletedTimerArr] = useState([]);
  const colorScheme = useColorScheme();
  
  const themeStyles = StyleSheet.create({
      container: {
        backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      },
      text: {
        color: colorScheme === 'dark' ? 'white' : 'black',
      },
      border: {
        borderColor: colorScheme === 'dark' ? 'white' : 'black',
      }
    });

  useFocusEffect(
    useCallback(() => {
      loadCompletedTimers();

      return () => {
        
      };
    }, [])
  );

  const loadCompletedTimers = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      const parsedStoredTimers = JSON.parse(storedTimers)
      if (storedTimers !== null) {
        const onlyCompletedTimers = parsedStoredTimers.filter(timer => timer.status === "Completed");
        setCompletedTimerArr(onlyCompletedTimers);
      }
    } catch (error) {
      console.error("Failed to load timers:", error);
    }
  };

  return (
    <View style={HomeScreenStyle.container}>
      <View style={HomeScreenStyle.container}>
        <Text style={{...themeStyles.text, ...HomeScreenStyle.headingText}}>Completed Timers</Text>
        <View style={HomeScreenStyle.tableContainer}>
          <View style={HomeScreenStyle.tableHeader}>
            <Text style={HomeScreenStyle.tableHeaderText}>Name</Text>
            <Text style={HomeScreenStyle.tableHeaderText}>Category</Text>
            <Text style={HomeScreenStyle.tableHeaderText}>Duration</Text>
          </View>
          {CompletedTimerArr.map((item) => (
            <View key={item.id}>
              <View  style={HomeScreenStyle.tableRow}>
              <Text style={{...themeStyles.text, ...HomeScreenStyle.tableCell}}>{item.name}</Text>
              <Text style={{...themeStyles.text, ...HomeScreenStyle.tableCell}}>{item.category}</Text>
              <Text style={{...themeStyles.text, ...HomeScreenStyle.tableCell}}>{item.duration}s</Text>
              </View>
             
            </View>
            
          ))}
        </View>
      </View>
    </View>
  )
}

export default HistoryScreen