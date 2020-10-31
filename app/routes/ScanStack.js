import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import ScanScreen from '../screens/ScanScreen';
import CameraScreen from '../screens/CameraScreen';
import AdditionalCameraScreen from '../screens/AdditionalCameraScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();

const ScanStack = () => {
    return (
        <View style={{ flex: 1, paddingTop: 20 }}>
            <Stack.Navigator headerMode={"none"}>
              <Stack.Screen name="ScanScreen" component={ScanScreen}/>
              <Stack.Screen name="CameraScreen" component={CameraScreen} />
              <Stack.Screen name="AdditionalCameraScreen" component={AdditionalCameraScreen} />
              <Stack.Screen name="ResultScreen" component={ResultScreen} />
            </Stack.Navigator>
        </View>
    );
}

export default ScanStack

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 