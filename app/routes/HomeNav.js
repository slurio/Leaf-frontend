import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from '../screens/Home';

import FavoriteStack from './FavoriteStack';
import ScanStack from './ScanStack';
import Profile from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

export default function HomeNav() {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="navy"
            labelStyle={{ fontSize: 12 }}
            // style={{ backgroundColor: 'black' }}
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                // options={{
                //     tabBarLabel: 'Home',
                //     tabBarIcon: () => (
                //       <MaterialCommunityIcons name="home" color='white' size={26} />
                //     ),
                // }}
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


