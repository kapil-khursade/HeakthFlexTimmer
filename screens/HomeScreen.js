import React, { useState, useCallback} from 'react';
import { View, Text, TextInput, Button, Alert, useColorScheme, StyleSheet } from 'react-native';
import HomeScreenStyle from '../styleSheets/ScreenStyle';
import { useFocusEffect } from "@react-navigation/native";

import loadTimers from './helpers/loadTimers';
import saveTimers from './helpers/saveTimers';
import restartPendingRunningTimmers from './helpers/restartPendingRunningTimmers';
import TimerTableComponant from './helpers/TimerTableComponant';
import SelectDropdownComponant from "./helpers/SelectDropdownComponant"


const HomeScreen = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [midwayAlert, setmidwayAlert] = useState(0);
  const [timerArr, setTimerArr] = useState([]);
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

  const catagoryArr = ['Work', 'Study', 'Play', 'Eat', 'Sleep'];
  const midwayAlertArr = [25, 50, 75]

  useFocusEffect(
    useCallback(() => {
      (async()=>{
        await loadTimers(setTimerArr);
        restartPendingRunningTimmers(timerArr, setTimerArr)
      })()
      return () => {
        
      };
    }, [])
  );

  const addTimer = async () => {
    if (!name || !duration || !category) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newTimer = {
      id: Date.now(),
      name,
      duration: parseInt(duration),
      category,
      status: "Paused",
      midwayAlert,
      countdown: 0,
      intervalId: null,
    };

    const updatedTimers = [...timerArr, newTimer];
    setTimerArr(updatedTimers);
    saveTimers(updatedTimers);

    setName('');
    setDuration('');
    setCategory('');
    setmidwayAlert(0)
  };
  
  return (
    <View style={{...themeStyles.container, ...HomeScreenStyle.container}}>
      <Text style={{...themeStyles.text, ...HomeScreenStyle.headingText}}>Add a Timer</Text>
      <TextInput
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
        style={{...themeStyles.text, ...HomeScreenStyle.input}}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={{...themeStyles.text, ...HomeScreenStyle.input}}
      />
    
      <SelectDropdownComponant name={"Catagory"} dataArr={catagoryArr} data={category} setdata={setCategory} themeStyles={themeStyles}/>
      <SelectDropdownComponant name={"Miday Alert Percentage (Optionall)"} data={midwayAlert} dataArr={midwayAlertArr} setdata={setmidwayAlert} themeStyles={themeStyles}/>

      <Button title="Add Timer" onPress={addTimer}/>
      
      <TimerTableComponant timerArr={timerArr} themeStyles={themeStyles} setTimerArr={setTimerArr} catagoryArr={catagoryArr}/>
    </View>
  );
};

export default HomeScreen;


