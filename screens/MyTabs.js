import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useColorScheme } from 'react-native';

const MyTabs = () => {
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home'
            } else if (route.name === 'History') {
              iconName = 'rotate-right'
            }
            return <Icon name={iconName} size={30} color={colorScheme === "dark" ? "white" : "dark"}/>;
          },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: "grey",
       })}
       >
       <Tab.Screen name="Home" component={HomeScreen} />
       <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  )
}

export default MyTabs