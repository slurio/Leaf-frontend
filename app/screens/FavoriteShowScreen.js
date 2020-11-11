import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Image, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch } from 'react-redux';
import { deleteItem } from '../redux/action';

import { HOST_WITH_PORT } from '../environment';

import Fiber from '../components/Fiber'
import CareInstruction from '../components/CareInstruction';

const FavoriteShowScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

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
    case('Honduras'):
    return <Image 
            style={{width: 240, height: 130}}
            source={require('../assets/countries/Honduras.png')}/>;
    case('Poland'):
      return <Image 
              style={{width: 170, height: 150}}
              source={require('../assets/countries/Poland.png')}/>;          
    default:
      return <NoResultText>No Country Image found for your result</NoResultText>         
  }}

  const removeItem = () => {
    let itemId = route.params.id
    let options = {
      method: 'DELETE'
    }
    fetch(`${HOST_WITH_PORT}/items/${itemId}/`, options)
    .then(resp => resp.json())
    .then(item => {
      dispatch(deleteItem(item))
      navigation.push('AllFavoritesScreen')
    })
  }

  return(
    <ScrollView>
      <StyledTextBorderLine>
        <StyledText>Your {route.params['title'].toUpperCase()}...</StyledText>
      </StyledTextBorderLine>

      <TopContainer>
        {renderImage()}
        <TouchableOpacity onPress={() => {
          removeItem()
        }}>
          <MaterialCommunityIcons name="recycle" color='#222' size={35} />
        </TouchableOpacity>
      </TopContainer>

      <BottomContainer>
        <CountryBorderLine>
          <Country>Made in {route.params['country_fact']['country'].toUpperCase()}</Country>
          <CountryData>{route.params['country_fact']['description']}</CountryData>
        </CountryBorderLine>

        <FiberBorderLine>
          <FiberTitle>Fiber Content</FiberTitle>
          {renderFibers()}
        </FiberBorderLine>

          <View >   
            <CareTitle>Care Instructions</CareTitle>
            {renderCareInstruction()}
          </View>
      </BottomContainer>
    </ScrollView>
  )
}

export default FavoriteShowScreen;

const StyledTextBorderLine = styled.View`
  border-bottom-width: .5px;
  border-bottom-color: grey;
  padding-bottom: 15px;
  margin-bottom: 0px;
`

const FiberBorderLine = styled.View`
  border-bottom-width: .5px;
  border-bottom-color: grey;
  padding-bottom: 15px;
  margin-bottom: 22px;
`

const CountryBorderLine = styled.View`
  border-bottom-width: .5px;
  border-bottom-color: grey;
  padding-bottom: 8px;
  margin-bottom: 25px;
`

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
  font-family: Raleway_500Medium
`

const CountryData = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: Raleway_400Regular_Italic;
  font-size: 18px;
  color: #222;
`

const FiberTitle = styled.Text`
  font-weight: bold;
  font-size: 30px;
  font-family: Raleway_500Medium
`

const CareTitle = styled.Text`
    font-weight: bold;
    font-size: 30px;
    font-family: Raleway_500Medium  
  `

  const StyledText = styled.Text`
    font-family: Raleway_700Bold;
    font-size: 24px;
    letter-spacing: 2px;
    margin: 30px;
    margin-top: 25px;
    margin-bottom: 0px;
    text-align: center;
  `