import React from 'react'
import styled from 'styled-components/native'

import { useSelector } from 'react-redux';
import { createStackNavigator } from "@react-navigation/stack";

import AllFavoritesScreen from '../screens/AllFavoritesScreen';
import FavoriteShowScreen from '../screens/FavoriteShowScreen';

const Stack = createStackNavigator();

const FavoriteStack = () => {   
    // const items = useSelector(state => state.items)

    // const renderItems = () => {
    //     return items.map(item => <Text>{item.title}</Text>)
    // }

    return(
       <Stack.Navigator>
            <Stack.Screen name="AllFavoritesScreen" component={AllFavoritesScreen}/>
            <Stack.Screen 
                name="FavoriteShowScreen" 
                component={FavoriteShowScreen}
            />
       </Stack.Navigator>
    )
}

export default FavoriteStack;

