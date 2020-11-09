import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";

import AllFavoritesScreen from '../screens/AllFavoritesScreen';
import FavoriteShowScreen from '../screens/FavoriteShowScreen';

const Stack = createStackNavigator();

const FavoriteStack = () => {  
    return(
       <Stack.Navigator headerMode={'float'}>
            <Stack.Screen name="AllFavoritesScreen" component={AllFavoritesScreen}
               options={{
                  title: 'Closet',
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
                    fontSize: 22,
                    letterSpacing: 2,
                    fontFamily: 'Raleway_500Medium',
                  },
                  headerBackTitleVisible: false,
                }}/>
            <Stack.Screen name="FavoriteShowScreen" component={FavoriteShowScreen}
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
    )
}

export default FavoriteStack;

