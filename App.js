import React from 'react';
import MyTabs from './screens/MyTabs';
import {  DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { Image } from 'react-native';


const App = () => {
  const Stack = createNativeStackNavigator();
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
         initialRouteName={"MyTabs"}
         screenOptions={{
          headerTitle: () => (
            <Image
              source={require("./assets/icon.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center", // Aligns the logo in the center
        }}
      >
         <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App