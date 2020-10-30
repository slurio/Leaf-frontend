import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import HomeNav from "./app/routes/HomeNav";
import OpenScreen from "./app/screens/OpenScreen";
import SignupScreen from "./app/screens/SignupScreen";

import {createStore, applyMiddleware} from 'redux'; 
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = (currentState = {tagInfo: []}, action) => { 
  if (action.type === "get tag info") {
    return { ...currentState, notes: [...currentState.notes, action.payload] }
  } else {
    return currentState
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk)) 

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="OpenScreen" component={OpenScreen} />
            <Stack.Screen name="HomeNav" component={HomeNav} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}