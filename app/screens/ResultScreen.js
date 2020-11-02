import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, ScrollView, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Fiber from '../components/Fiber'
import CareInstruction from '../components/CareInstruction';

function ResultScreen({route}) {

    const [favorite, setFavorite] = useState(false)
    const country = route.params[0].country_data[0].country
    const country_img = route.params[0].country_data[0].img
    const country_data = route.params[0].country_data[0].description
    const fibers = route.params[0].fibers_data
    const clothingDescription = route.params[1].description

    const renderFibers = () => {
      return fibers.map(fiber => <Fiber key={fiber.index} fiber={fiber.fiber} percentage={fiber.percentage}/>)
    }

    const renderCareInstruction = () => {
      return fibers.map(fiber => <CareInstruction key={fiber.index} fiber={fiber.fiber}/>)
    }

    return(
        <ScrollView>
          <TopContainer>
            <Text>Your {clothingDescription}...</Text>
            <Image
              style={{width: 150, height: 150}}
              source={{
                uri: country_img
              }}
            />
            <TouchableOpacity onPress={() => setFavorite(!favorite)}>
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
  font-size: 30px;
`