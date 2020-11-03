import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import FavoriteStack from './FavoriteStack';
import ScanStack from './ScanStack';
import Profile from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

export default function HomeNav() {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#222"
            inactiveColor="#222"
            labelStyle={{ fontSize: 12 }}
            barStyle={{ backgroundColor: '#DBDED5'}}
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="home-outline" color='#222' size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoriteStack}
                options={{
                    tabBarLabel: 'Closet',
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="wardrobe-outline" color='#222' size={26} />
                    ),
                }} 
            />
            <Tab.Screen
                name="Scan"
                component={ScanStack}
                options={{
                    tabBarLabel: 'Scan',
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="tag-outline" color='#222' size={26} />
                    ),
                }}  
            />
            <Tab.Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                      <MaterialCommunityIcons name="account-outline" color='#222' size={26} />
                    ),
                }} 
            />
        </Tab.Navigator>
    )
}


