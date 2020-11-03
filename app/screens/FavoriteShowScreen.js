import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text } from 'react-native';

import Fiber from '../components/Fiber'
import CareInstruction from '../components/CareInstruction';

const FavoriteShowScreen = ({route}) => {
    const renderFibers = () => {
        return route.params['fiber_facts'].map(fiber => <Fiber key={fiber.id} fiber={fiber} percentage={fiber.percentage}/>)
    }
  
    const renderCareInstruction = () => {
        return route.params['fiber_facts'].map(fiber => <CareInstruction key={fiber.id} fiber={fiber}/>)
    }

    return(
        <ScrollView>
        <TopContainer>
          <Text>Your {route.params['title']}...</Text>
          {/* <Image
            style={{width: 150, height: 150}}
            source={{
              uri: country_img
            }}
          /> */}
          {/* <TouchableOpacity onPress={() => {
            SaveItem()
          }}>
            {favorite ? <MaterialCommunityIcons name="home" color='#222222' size={40} /> : <MaterialCommunityIcons name="heart-outline" color='#222222' size={40} />}
          </TouchableOpacity> */}
        </TopContainer>

        <BottomContainer>
          <Country>Made In {route.params['country_fact']['country']}</Country>
            <CountryData>{route.params['country_fact']['description']}</CountryData>

          <FiberTitle>Content</FiberTitle>
            {renderFibers()}
          <CareTitle>Care Instructions</CareTitle>
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