import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../screens/Home';

import FavoriteStack from './FavoriteStack';
import ScanStack from './ScanStack';
import Profile from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

export default function HomeNav() {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            inactiveColor="#292d2c"
            shifting={false}
            labelStyle={{ fontSize: 12 }}
            barStyle={{ backgroundColor: '#d8ebd8' }}
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="home" color='white' size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoriteStack} 
            />
            <Tab.Screen
                name="Scan"
                component={ScanStack} 
            />
            <Tab.Screen 
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    )
}


