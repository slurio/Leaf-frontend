import React from 'react';
import styled from 'styled-components/native';
import { Text, ScrollView, View, Image, Dimensions } from 'react-native';

import { PieChart } from 'react-native-svg-charts'
import { VictoryPie } from "victory-native";

const Profile = (props) => {

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const screenWidth = Math.round(Dimensions.get('window').width);

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
                        <UserText>Logged in as USER</UserText>
                    </UserContainer>
                        <LogOutButton>
                            <LogOutText>Log Out</LogOutText>
                        </LogOutButton>
            </TopContainer>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                <Image style={{width: screenWidth, height:250, marginTop:20}} source={require('../assets/Profile.jpg')}/>
                <StyledChartContainer></StyledChartContainer>
            </View>
            
            <PieChart style={{ height: 200 }} data={pieData} />

            <VictoryPie
                data={[
                    { x: "Cats", y: 35 },
                    { x: "Dogs", y: 40 },
                    { x: "Birds", y: 55 }
                ]}
                colorScale="qualitative"
                height={400}
                style={{labels:{fontSize: 10}}}
            />

       </ScrollView>
    )
}

export default Profile

const StyledChartContainer = styled.View`
    background-color: #fff;
    height: 110px;
    width: 380px;
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