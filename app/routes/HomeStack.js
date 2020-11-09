import React from 'react';
import styled from 'styled-components/native';

import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';


const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <StyledView>
            <Stack.Navigator headerMode={"float"}>
              <Stack.Screen name="Home" component={Home}
               options={{
                title: 'THE THREAD',
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
                  fontFamily: 'Raleway_600SemiBold',
                  fontSize: 22,
                  letterSpacing: 2,
                },
                headerBackTitleVisible: false,
              }}/>
            </Stack.Navigator>
        </StyledView>
    );
}

export default HomeStack

const StyledView = styled.View`
    flex: 1;
` 