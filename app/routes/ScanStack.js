import React from 'react';
import styled from 'styled-components/native';

import { createStackNavigator } from "@react-navigation/stack";

import ScanScreen from '../screens/ScanScreen';
import InstructionScreen from '../screens/InstructionScreen';
import CameraScreen from '../screens/CameraScreen';
import AdditionalCameraScreen from '../screens/AdditionalCameraScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();

const ScanStack = () => {
    return (
        <StyledView>
            <Stack.Navigator headerMode={"float"}>
              <Stack.Screen name="ScanScreen" component={ScanScreen}
               options={{
                title: 'Scan',
                headerLeft: null,
                headerStyle: {
                  backgroundColor: '#222',
                  height: (Platform.OS === 'ios') ? 70 : 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'Raleway_500Medium',
                  fontSize: 22,
                  letterSpacing: 2,
                },
                headerBackTitleVisible: false,
              }}/>
              <Stack.Screen name="InstructionScreen" component={InstructionScreen}
               options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#222',
                  height: (Platform.OS === 'ios') ? 70 : 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
              }}/>
              <Stack.Screen name="CameraScreen" component={CameraScreen}
               options={{
                headerLeft: null,
                headerStyle: {
                  backgroundColor: '#222',
                  height:  0,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerTintColor: '#fff',
              }}/>
              <Stack.Screen name="AdditionalCameraScreen" component={AdditionalCameraScreen}
              options={{
                headerLeft: null,
                headerStyle: {
                  backgroundColor: '#222',
                  height:  0,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerTintColor: '#fff',
              }}/>
              <Stack.Screen name="ResultScreen" component={ResultScreen}
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#222',
                  height: (Platform.OS === 'ios') ? 70 : 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
              }}/>
            </Stack.Navigator>
        </StyledView>
    );
}

export default ScanStack

const StyledView = styled.View`
    flex: 1;
` 