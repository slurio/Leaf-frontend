import "react-native-gesture-handler";
import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import { AppLoading } from 'expo';
import { useFonts, Lora_400Regular } from '@expo-google-fonts/lora';



import HomeNav from "./app/routes/HomeNav";
import OpenScreen from "./app/screens/OpenScreen";
import SignupScreen from "./app/screens/SignupScreen";
import SignInScreen from "./app/screens/SignInScreen";

import {createStore, applyMiddleware} from 'redux'; 
import { Provider } from 'react-redux';


const rootReducer = (currentState= {user:''}, action) => {
  if(action.type === "login user"){
    return {...currentState, user: action.payload.username}
  }else {
    return currentState
  }
}

const store = createStore(rootReducer) 

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    Lora_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

      return (
        <Provider store={store}>
          <View style={{ flex: 1, paddingTop: 20 }}>
             <NavigationContainer>
              <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name="OpenScreen" component={OpenScreen} />
                <Stack.Screen name="HomeNav" component={HomeNav} />
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
              </Stack.Navigator>
            </NavigationContainer> 
          </View>
        </Provider>
      )

    
}