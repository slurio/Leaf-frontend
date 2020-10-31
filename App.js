import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font';

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
  const [isLoaded] = useFonts({
    'Roboto-LightItalic': require('./app/assets/fonts/Roboto-LightItalic.ttf'),
    });

    if(!isLoaded) {
      return <AppLoading/>
    } else {
      return (
        <Provider store={store}>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <Text style={{fontFamily: 'Roboto-ItalicLight'}}>Hello World</Text>
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
}