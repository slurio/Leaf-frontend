import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, ScrollView, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Fiber from '../components/Fiber'
import CareInstruction from '../components/CareInstruction';

import { SaveFavorite } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';

import { HOST_WITH_PORT } from '../environment';

function ResultScreen({route}) {
    const [favorite, setFavorite] = useState(false)
    const country = route.params[0].country_data[0].country
    // const country_img = route.params[0].country_data[0].img
    const country_data = route.params[0].country_data[0].description
    const fibers = route.params[0].fibers_data
    const clothingDescription = route.params[1].description

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const SaveItem = () => {
      // call SaveFavorite action
      let itemObj = {
        title: clothingDescription,
        user_id: user.id,
        country: route.params[0].country_data[0],
        fibers: route.params[0].fibers_data,
      }

      let options={
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(itemObj)
      }

      fetch(`${HOST_WITH_PORT}/items/`, options)
      .then(resp => resp.json())
      .then(savedItem => {
        setFavorite(true)
        dispatch(SaveFavorite(savedItem))
      })
    }

    const renderFibers = () => {
      return fibers.map(fiber => <Fiber key={fiber.fiber.id} fiber={fiber.fiber} percentage={fiber.percentage}/>)
    }

    const renderCareInstruction = () => {
      return fibers.map(fiber => <CareInstruction key={fiber.fiber.id} fiber={fiber.fiber}/>)
    }

    const renderImage = () => {
      switch(country){
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
            <ItemTitle style={{margin:30}}>Your {clothingDescription}...</ItemTitle>
          <TopContainer>
                {renderImage()}
            <TouchableOpacity onPress={() => {
              SaveItem()
            }}>
              {favorite ? <MaterialCommunityIcons name="heart" color='#222222' size={40} /> : <MaterialCommunityIcons name="heart-outline" color='#222222' size={40} />}
            </TouchableOpacity>
          </TopContainer>
  
          <BottomContainer>
            <Country>Made In {country}</Country>
              <CountryData>{country_data}</CountryData>

            <FiberTitle>Content</FiberTitle>
              {renderFibers()}
            <CareTitle>Care Instructions</CareTitle>
              {renderCareInstruction()}
          </BottomContainer>
        </ScrollView>
        
    )
}

export default ResultScreen;

const ItemTitle = styled.Text`
font-family: Raleway_700Bold;
font-size: 20px;
letter-spacing: 2px;
margin: 30px;
margin-bottom: 0px;
`

const TopContainer = styled.View`
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
  font-size: 30px;
`