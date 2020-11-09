import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, View, Image, Dimensions } from 'react-native';

import {useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/action';

import { VictoryPie } from "victory-native";

const Profile = ({navigation}) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const username = useSelector(state => state.user ? state.user.name : state.newUser.name)
    const items = useSelector(state => state.items)
    const dispatch = useDispatch();

    const naturalFiberArray = []
    const syntheticFiberArray = []
    const countryArray = []

    items.map(item => {
        countryArray.push(item['country_fact']['country'].toUpperCase())
        item['item_fiber_facts'].map(fiber => {
            fiber['fiber_fact']['natural_fiber'] ?
            naturalFiberArray.push(fiber['fiber_fact']['name'].toUpperCase())
            : syntheticFiberArray.push(fiber['fiber_fact']['name'].toUpperCase())
        })
    })

    let naturalFiberData = naturalFiberArray.reduce(function(obj,b){
        obj[b] = ++ obj[b] || 1
        return obj
    }, {})

    let naturalGraphData = []
    for(const [key, value] of Object.entries(naturalFiberData)) {
        naturalGraphData.push({x: key, y: value})
    }

    let syntheticFiberyData = syntheticFiberArray.reduce(function(obj,b){
        obj[b] = ++ obj[b] || 1
        return obj
    }, {})

    let syntheticGraphData = []
    for(const [key, value] of Object.entries(syntheticFiberyData)) {
        syntheticGraphData.push({x: key, y: value})
    }

    let countryData = countryArray.reduce(function(obj,b){
        obj[b] = ++ obj[b] || 1
        return obj
    }, {})

    let countryGraphyData = []
    for(const [key, value] of Object.entries(countryData)) {
        countryGraphyData.push({x: key, y: value})
    }
    
    const logOutUser = () => {
        dispatch(logOut())
        navigation.push('OpenScreen')
    }
    
    let cssColors = [`AliceBlue`,`AntiqueWhite`,`Aqua`,`Aquamarine`,`Azure`,`Beige`, `Bisque`,`Black`,`BlanchedAlmond`,`Blue`,`BlueViolet`,`Brown`,`BurlyWood`,`CadetBlue`,`Chartreuse`,`Chocolate`,`Coral`,`CornflowerBlue`,`Cornsilk`,`Crimson`,`Cyan`,`DarkBlue`,`DarkCyan`,
    `DarkGoldenRod`,`DarkGrey`,`DarkGreen`,`DarkKhaki`,`DarkMagenta`,`DarkOliveGreen`,`Darkorange`,
    `DarkOrchid`,`DarkRed`,`DarkSalmon`,`DarkSeaGreen`,`DarkSlateBlue`,`DarkSlateGrey`,`DarkTurquoise`,`DarkViolet`,`DeepPink`,`DeepSkyBlue`,
    `DimGray`,`DimGrey`,`DodgerBlue`,`FireBrick`,`FloralWhite`,`ForestGreen`,`Fuchsia`,`Gainsboro`,`GhostWhite`,`Gold`,`GoldenRod`,`Grey`,`Green`,`GreenYellow`,`HoneyDew`,
    `HotPink`,`IndianRed`,`Indigo`,`Ivory`,`Khaki`,`Lavender`,`LavenderBlush`,`LawnGreen`,`LemonChiffon`,`LightBlue`,`LightCoral`,
    `LightCyan`,`LightGoldenRodYellow`,`LightGrey`,`LightGreen`,`LightPink`,`LightSalmon`,`LightSeaGreen`,`LightSkyBlue`,`LightSlateGray`,
    `LightSteelBlue`,`LightYellow`,`Lime`,`LimeGreen`,`Linen`,`Magenta`,`Maroon`,`MediumAquaMarine`,`MediumBlue`,`MediumOrchid`,
    `MediumPurple`,`MediumSeaGreen`,`MediumSlateBlue`,`MediumSpringGreen`,`MediumTurquoise`,`MediumVioletRed`,`MidnightBlue`,`MintCream`,`MistyRose`,`Moccasin`,
    `NavajoWhite`,`Navy`,`OldLace`,`Olive`,`OliveDrab`,`Orange`,`OrangeRed`,`Orchid`,`PaleGoldenRod`,`PaleGreen`,`PaleTurquoise`,`PaleVioletRed`,`PapayaWhip`,`PeachPuff`,`Peru`,`Pink`,`Plum`,`PowderBlue`,
    `Purple`,`Red`,`RosyBrown`,`RoyalBlue`,`SaddleBrown`,`Salmon`,`SandyBrown`,`SeaGreen`,`SeaShell`,`Sienna`,`Silver`,`SkyBlue`,`SlateBlue`,`SlateGray`,`SlateGrey`,`Snow`,`SpringGreen`,`SteelBlue`,`Tan`,
    `Teal`,`Thistle`,`Tomato`,`Turquoise`,`Violet`,`Wheat`,`White`,`WhiteSmoke`,`Yellow`,`YellowGreen`,
    ]

    let naturalGraphColors = naturalGraphData.map(data => cssColors[Math.floor(Math.random() * cssColors.length)].toLowerCase())
    let syntheticGraphColors = syntheticGraphData.map(data => cssColors[Math.floor(Math.random() * cssColors.length)].toLowerCase())
    let countryGraphColors = countryGraphyData.map(data => cssColors[Math.floor(Math.random() * cssColors.length)].toLowerCase())

    return(
       <ScrollView style={{backgroundColor: '#fff'}}>
           <View style={{margin: 20, marginLeft: -2,marginRight: -2, marginBottom:10}}>
            <TopContainer>
                <UserContainer>
                    <UserText>Logged in as <UsernameText>{username === undefined ? null : username.toUpperCase()}</UsernameText></UserText>
                </UserContainer>
                    <LogOutButton onPress={() => logOutUser()}>
                        <LogOutText>Log Out</LogOutText>
                    </LogOutButton>
            </TopContainer>
                <View style={{marginLeft: 20, marginRight:20, marginTop:-4}}>
                    <ProfileGreeting>Your closet overview, see how much natural and synthetic fibers make up your closet along with your clothing origins. </ProfileGreeting>
                </View>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                <Image style={{width: screenWidth, height:250, marginTop:20}} source={require('../assets/Profile.jpg')}/>
                <TopChartContainer>
                        <NaturalTitle>NATURAL FIBERS</NaturalTitle>
                        <VictoryPie
                            data= {naturalGraphData}
                            colorScale={naturalGraphColors}
                            labelRadius={130}
                            height={320}
                            style={{labels:{fontSize: 14, fill: 'black'},parent:{alignItems:'center', marginRight: 18}}}
                        />
                </TopChartContainer>
                <BottomChartContainter>
                    <SyntheticTitle>SYNTHETIC FIBERS</SyntheticTitle>
                    <VictoryPie
                        data= {syntheticGraphData}
                        colorScale={syntheticGraphColors}
                        height={320}
                        labelRadius={125}
                        style={{labels:{fontSize: 14, fill: 'white'},parent:{marginBottom:30}}}
                    />
                </BottomChartContainter>
                <CountryChartContainer>
                    <CountryTitle>COUNTRIES</CountryTitle>
                    <VictoryPie
                        data= {countryGraphyData}
                        colorScale={countryGraphColors}
                        labelRadius={125}
                        height={320}
                        style={{labels:{fontSize: 14, fill: 'black'}}}
                    />
                </CountryChartContainer>
            </View>
       </ScrollView>
    )
}

export default Profile

const NaturalTitle = styled.Text`
    text-align: center;
    margin-top: 20px;
    margin-bottom: 14px;
    font-size: 24px;
    font-family: Raleway_700Bold;
    color: #222;
`

const SyntheticTitle = styled.Text`
    text-align: center;
    color: white;
    margin-bottom: 16px;
    font-size: 24px;
    font-family: Raleway_700Bold;
`

const BottomChartContainter = styled.View`
    background-color: #222;
    width: 420px;
    margin-top: 330px;
    padding-top: 30px;
    align-items: center;
   
`

const CountryChartContainer = styled.View`
    background-color: #fff;
    width: 420px;
    padding-top: 10px;
    margin-bottom: 14px;
    align-items: center;
`

const CountryTitle = styled.Text`
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
    font-family: Raleway_700Bold;
    color: #222;
`

const TopChartContainer = styled.View`
    background-color: #fff;
    width: 350px;
    position: absolute;
    margin-top: 200px;
    margin-bottom: 14px;
`

const ProfileGreeting = styled.Text`
    font-family: Raleway_400Regular_Italic;
    font-size: 18px;
    color: #222;    
    text-align: center;
    margin-top: 24px;
`

const UserContainer = styled.View`
    align-items: center;
    justify-content: center;
`

const UserText = styled.Text`
    color: #222;
    font-size: 18px;
    font-family: Raleway_600SemiBold;
`

const UsernameText = styled.Text`
    color: #222;
    font-size: 20px;
    font-family: Raleway_700Bold;
    letter-spacing: 2px;
`

const LogOutButton = styled.TouchableOpacity`
    margin-top: 15px;
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
    justify-content: center;
    align-items: center;
`

const StyledView = styled.View`

` 