import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'

const Tabs = createBottomTabNavigator()



const Home = () => {
    return(
        <StyledView>
             <Text>Home</Text>
         </StyledView>
    )
}

export default Home;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 
