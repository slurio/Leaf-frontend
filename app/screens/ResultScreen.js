import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ScrollView, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HOST_WITH_PORT, API_KEY } from '../environment';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Fiber from '../components/Fiber'
import CareInstruction from '../components/CareInstruction';


function ResultScreen({route}) {
    console.log(route.params)
    const country = route.params.country_data[0].country
    const country_img = route.params.country_data[0].img
    const country_data = route.params.country_data[0].description
    const fibers = route.params.fibers_data
    // const percentages = route.params.percentages

    const renderFibers = () => {
      return fibers.map(fiber => <Fiber key={fiber.index} fiber={fiber.fiber} percentage={fiber.percentage}/>)
    }

    const renderCareInstruction = () => {
      return fibers.map(fiber => <CareInstruction key={fiber.index} instruction={fiber.fiber.care_instructions}/>)
    }

    return(
        <ScrollView>
          <TopContainer>
            <Image
              style={{width: 150, height: 150}}
              source={{
                uri: country_img
              }}
            />
            <TouchableOpacity>
              <MaterialCommunityIcons name="heart-outline" color='#222222' size={40} />
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