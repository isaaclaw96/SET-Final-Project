import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { store, persistor } from "./src/store";
import { Provider } from "react-redux";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Login from "./src/containers/login";
import Register from "./src/containers/register";
import Home from "./src/containers/home";

export default function App() {
  return (
    <Provider store={store} persistor={persistor}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false,headerBackVisible:false }}/>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false, title: "TaskMaster", headerStyle: {backgroundColor: 'red',}, headerTintColor: '#fff', headerTitleStyle: {
            fontWeight: 'bold',}}}/>
        </Stack.Navigator>      
      </NavigationContainer>    
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
