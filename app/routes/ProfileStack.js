import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, View, Image, Dimensions } from 'react-native';

import {useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/action';

import { PieChart } from 'react-native-svg-charts'
import { VictoryPie } from "victory-native";

const Profile = ({navigation}) => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const screenWidth = Math.round(Dimensions.get('window').width);
    const username = useSelector(state => state.user ? state.user.name : state.newUser.name)
    const dispatch = useDispatch();

    const logOutUser = () => {
        dispatch(logOut())
        navigation.push('OpenScreen')
    }

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))     

    return(
       <ScrollView style={{backgroundColor: '#fff'}}>
           <View style={{margin: 30, marginBottom:10}}>
               <ProfileGreeting>Your profile  to see whats in your closet etc.</ProfileGreeting>
            <TopContainer>
                <UserContainer>
                    <UserText>Logged in as {username}</UserText>
                </UserContainer>
                    <LogOutButton onPress={() => logOutUser()}>
                        <LogOutText>Log Out</LogOutText>
                    </LogOutButton>
            </TopContainer>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                <Image style={{width: screenWidth, height:250, marginTop:20}} source={require('../assets/Profile.jpg')}/>
                <TopChartContainer>
                    <NaturalTitle>NATURAL FIBERS</NaturalTitle>
                    <PieChart style={{ height: 270, marginTop: 40}} data={pieData} />
                </TopChartContainer>
                <BottomChartContainter>
                    <SyntheticTitle>MAN-MADE FIBERS</SyntheticTitle>
                    <VictoryPie
                        data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }
                        ]}
                        colorScale="qualitative"
                        height={380}
                        style={{labels:{fontSize: 10},}}
                    />
                </BottomChartContainter>
            </View>
       </ScrollView>
    )
}

export default Profile

const NaturalTitle = styled.Text`
    text-align: center;
    margin-top: 20px;
    font-size: 24px;
    font-family: Raleway_700Bold;
    color: #222;
`

const SyntheticTitle = styled.Text`
    text-align: center;
    color: white;
    font-size: 24px;
    font-family: Raleway_700Bold;
`

const BottomChartContainter = styled.View`
    background-color: #222;
    height: 110px;
    width: 420px;
    height: 45%;
    margin-top: 320px;
    padding-top: 30px;
    align-items: center;
`

const TopChartContainer = styled.View`
    background-color: #fff;
    width: 350px;
    position: absolute;
    margin-top: 200px;
`

const ProfileGreeting = styled.Text`
    text-align: center;
    margin-bottom: 25px;
`

const UserContainer = styled.View`
    width: 170px;
    height: 38px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid black;
`

const UserText = styled.Text`
    color: #222;
    font-size: 16px;
    font-family: Raleway_700Bold;
`

const LogOutButton = styled.TouchableOpacity`
    width: 140px;
    height: 38px;
    align-items: center;
    justify-content: center;
    background-color:#222;
    border-radius: 4px;
`
const LogOutText = styled.Text`
    color: white;
    font-size: 16px;
    font-family: Raleway_700Bold;
`

const TopContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`

const StyledView = styled.View`

` 