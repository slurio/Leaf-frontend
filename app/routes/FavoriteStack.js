import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";

import AllFavoritesScreen from '../screens/AllFavoritesScreen';
import FavoriteShowScreen from '../screens/FavoriteShowScreen';

const Stack = createStackNavigator();

const FavoriteStack = () => {  
    return(
       <Stack.Navigator>
            <Stack.Screen name="AllFavoritesScreen" component={AllFavoritesScreen}/>
            <Stack.Screen name="FavoriteShowScreen" component={FavoriteShowScreen}/>
       </Stack.Navigator>
    )
}

export default FavoriteStack;

