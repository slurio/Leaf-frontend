import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Fiber from '../components/Fiber'
import CareInstruction from '../components/CareInstruction';

const FavoriteShowScreen = ({route}) => {
    const renderFibers = () => {
        return route.params['item_fiber_facts'].map(fiber => <Fiber key={fiber.id} fiber={fiber['fiber_fact']} percentage={fiber['percentage']}/>)
    }
  
    const renderCareInstruction = () => {
        return route.params['item_fiber_facts'].map(fiber => <CareInstruction key={fiber.id} fiber={fiber['fiber_fact']}/>)
    }

    const renderImage = () => {
    switch(route.params['country_fact']['country']){
      case('China'):
        return <Image 
                style={{width: 210, height: 150}}
                source={require('../assets/countries/China.png')}/>;
      case('USA'):
        return <Image 
                style={{width: 250, height: 150}}
                source={require('../assets/countries/USA.png')}/>;
      case('Bangladesh'):
        return <Image 
                style={{width: 150, height: 150}}
                source={require('../assets/countries/Bangladesh.png')}/>;
      case('Germany'):
        return <Image 
                style={{width: 150, height: 150}}
                source={require('../assets/countries/Germany.png')}/>;
      case('India'):
        return <Image 
                style={{width: 150, height: 150}}
                source={require('../assets/countries/India.png')}/>;
      case('Italy'):
        return <Image 
                style={{width: 150, height: 150}}
                source={require('../assets/countries/Italy.png')}/>;
      case('Vietnam'):
        return <Image 
                style={{width: 150, height: 150}}
                source={require('../assets/countries/Vietnam.png')}/>;
    }}

    return(
        <ScrollView>
          <StyledText>Your {route.params['title']}...</StyledText>
        <TopContainer>
          {renderImage()}
          <TouchableOpacity onPress={() => {
            console.log('delete')
          }}>
            <MaterialCommunityIcons name="recycle" color='#222' size={35} />
          </TouchableOpacity>
        </TopContainer>

        <BottomContainer>
          <Country>Made In {route.params['country_fact']['country']}</Country>
            <CountryData>{route.params['country_fact']['description']}</CountryData>

          <FiberTitle>Content</FiberTitle>
            {renderFibers()}
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>   
            <CareTitle>Care Instructions</CareTitle>
            <TouchableOpacity onPress={() => console.log('edit')}>
              <MaterialCommunityIcons style={{marginRight:20}}name="pencil-outline" color='#222' size={35} />
            </TouchableOpacity>
          </View>
            {renderCareInstruction()}
        </BottomContainer>
      </ScrollView>
    )
}

export default FavoriteShowScreen;

const TopContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 30px;
  justify-content: space-between;
`

const BottomContainer = styled.View`
  flex: 3;
  margin: 30px;
  margin-top: -10px;
`

const Country = styled.Text`
  font-weight: bold;
  font-size: 30px;
`

const CountryData = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
`

const FiberTitle = styled.Text`
  font-weight: bold;
  font-size: 30px;
`

const CareTitle = styled.Text`
  font-weight: bold;
  font-size: 30px;`

  const StyledText = styled.Text`
    font-family: Raleway_700Bold;
    font-size: 20px;
    letter-spacing: 2px;
    margin: 30px;
    margin-bottom: 0px;
  `