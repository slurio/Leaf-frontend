import "react-native-gesture-handler";
import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import { AppLoading, Font } from 'expo';
import { useFonts,   Raleway_100Thin,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light,
  Raleway_300Light_Italic,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_500Medium,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold, } from '@expo-google-fonts/raleway';



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
    Raleway_100Thin,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light,
    Raleway_300Light_Italic,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_500Medium,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

      return (
        <Provider store={store}>
          <View style={{ flex: 1, backgroundColor:'#DBDED5'}}>
             <NavigationContainer>
              <Stack.Navigator headerMode={'float'}>
                <Stack.Screen 
                  name="OpenScreen" 
                  component={OpenScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="HomeNav" component={HomeNav} 
                 options={{
                  title: 'The Thread',
                  headerLeft: null,
                  headerStyle: {
                    backgroundColor: '#fff',
                    height: 50,
                  },
                  headerTintColor: '#222',
                  headerTitleStyle: {
                    fontFamily: 'Raleway_700Bold',
                    fontSize: 25,
                    letterSpacing: 2,
                  },
                  headerBackTitleVisible: false,
                }}/>
                <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
              </Stack.Navigator>
            </NavigationContainer> 
          </View>
        </Provider>
      )

    
}