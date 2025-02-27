import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList} from 'react-native';
import HomeScreenStyle from '../../styleSheets/ScreenStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import SelectDropdownComponant from './SelectDropdownComponant';

import deleteTimer from './deleteTimer';
import resetTimer from './resetTimer';
import toggleStart from './toggleStart';
import exportDataAsCSV from './exportDataAsCSV';

const TimerTableComponant = ({timerArr, themeStyles, setTimerArr, catagoryArr}) => {
  const [bulkCategory, setBulkCategory] = useState('');
  const [sortedTimerArr, setSortedTimerArr] = useState();

  useEffect(() => {
    if (bulkCategory) {
      setSortedTimerArr(timerArr.filter(timer => timer.category === bulkCategory));
    } else {
      setSortedTimerArr(timerArr);  // Show all if no category is selected
    }
  }, [bulkCategory, timerArr]);

  const renderItem = ({ item }) => {
   return (
    <View key={item.id } style={HomeScreenStyle.tableRowContainer}>
    <View  style={HomeScreenStyle.tableRow}>
    <Text style={{...themeStyles.text, ...HomeScreenStyle.tableCell}}>{item.name}</Text>
    <Text style={{...themeStyles.text, ...HomeScreenStyle.tableCell}}>{item.category}</Text>
    <Text style={{...themeStyles.text, ...HomeScreenStyle.tableCell}}>{item.countdown}/{item.duration}s</Text>
    {item.status === "Completed" ? <View style={HomeScreenStyle.actionBtn}><Icon name={"check"} size={20} color={"green"}/></View> : 
    <TouchableOpacity onPress={() => toggleStart(item.id, null, setTimerArr)} style={HomeScreenStyle.actionBtn}>
      <Icon name={item.status === "Paused" ? "play" : "pause"} size={20} color={"blue"}/>
    </TouchableOpacity>
    }
    <TouchableOpacity onPress={() => resetTimer(item.id, null, setTimerArr)} style={HomeScreenStyle.actionBtn}>
      <Icon name="refresh" size={20} color={"blue"}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => deleteTimer(item.id, setTimerArr)} style={HomeScreenStyle.actionBtn}>
      <Icon name="trash-o" size={20} color={"red"}/>
    </TouchableOpacity>
    </View>
    {item.status === "Running" ? <Progress.Bar progress={item.countdown/item.duration} width={null} /> : ""}
  </View>
   )
  }

  return (
    <View style={HomeScreenStyle.container}>
    
    <View style={HomeScreenStyle.headerContainer}>
      <Text style={{...themeStyles.text, ...HomeScreenStyle.headingText}}>Your Timers </Text>
      <TouchableOpacity onPress={() => exportDataAsCSV()} style={HomeScreenStyle.exportBtn}>
         <Text style={{...themeStyles.text, ...HomeScreenStyle.tableCell}}>Export Data</Text>
          <Icon name={"download"} size={20} color={"blue"}/>
      </TouchableOpacity>
    </View>

    {
      bulkCategory === '' ?
      <View style={HomeScreenStyle.sortContainer}>
        <Text style={{...themeStyles.text, ...HomeScreenStyle.subHeadingText}}>Sort:</Text>
        <View style={HomeScreenStyle.sortBtnContainer}>
        <SelectDropdownComponant name={"Catagory"} dataArr={catagoryArr} data={bulkCategory} setdata={setBulkCategory} themeStyles={themeStyles}/>
        </View>
      </View> :
      <View style={HomeScreenStyle.sortContainer}>
      <Text style={{...themeStyles.text, ...HomeScreenStyle.subHeadingText}}>Bulk Actions for {bulkCategory}</Text>
      <View style={HomeScreenStyle.bulkActionBtnContainer}>
        <TouchableOpacity onPress={() => toggleStart(null, {bulkCategory, action: "Running"}, setTimerArr)} style={HomeScreenStyle.actionBtn}>
          <Icon name={"play-circle"} size={20} color={"blue"}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleStart(null, {bulkCategory, action: "Pause"}, setTimerArr)} style={HomeScreenStyle.actionBtn}>
          <Icon name={"pause"} size={20} color={"blue"}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetTimer(null, bulkCategory, setTimerArr)} style={HomeScreenStyle.actionBtn}>
          <Icon name="refresh" size={20} color={"blue"}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setBulkCategory('')} style={HomeScreenStyle.actionBtn}>
          <Icon name="remove" size={20} color={"red"}/>
        </TouchableOpacity>
      </View>
    </View>
    }

    <View style={HomeScreenStyle.tableContainer}>
      <View style={HomeScreenStyle.tableHeader}>
        <Text style={HomeScreenStyle.tableHeaderText}>Name</Text>
        <Text style={HomeScreenStyle.tableHeaderText}>Category</Text>
        <Text style={HomeScreenStyle.tableHeaderText}>Timer</Text>
        <Text style={HomeScreenStyle.tableHeaderText}>Actions</Text>
      </View>

      <View style={HomeScreenStyle.flatListContainer}>
      <FlatList
          data={bulkCategory === '' ? timerArr : sortedTimerArr}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        /> 
      </View>
    </View>
  </View>
  )
}

export default TimerTableComponant