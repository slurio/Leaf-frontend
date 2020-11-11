import React from 'react';
import styled from 'styled-components/native';

import { createStackNavigator } from "@react-navigation/stack";

import Profile from '../screens/Profile';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <StyledView>
      <Stack.Navigator headerMode={"float"}>
        <Stack.Screen name="Profile" component={Profile}
          options={{
          title: 'Profile',
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
      </Stack.Navigator>
    </StyledView>
  )
}

export default ProfileStack;

const StyledView = styled.View`
    flex: 1;
` 