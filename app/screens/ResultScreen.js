import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, ScrollView, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Fiber from '../components/Fiber'
import CareInstruction from '../components/CareInstruction';

import { SaveFavorite } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';

import { HOST_WITH_PORT } from '../environment';

function ResultScreen({route}) {
    const [favorite, setFavorite] = useState(false)
    const country = route.params[0].country_data[0] ? route.params[0].country_data[0].country : false
    const country_data = route.params[0].country_data[0] ? route.params[0].country_data[0].description : false
    const fibers = route.params[0].fibers_data ? route.params[0].fibers_data : false    
    const clothingDescription = route.params[1].description ? route.params[1].description : 'Item'+ Math.floor(Math.random()*(999-100+1)+100).toString()

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const SaveItem = () => {
      if(!favorite) {  
        setFavorite(true)  
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
          dispatch(SaveFavorite(savedItem))
        })
      }
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

    return(
        <ScrollView>
          <StyledBorderLine>
            <ItemTitle style={{margin:30}}>Your {clothingDescription.toUpperCase()}...</ItemTitle>
          </StyledBorderLine>
          <TopContainer>
            {renderImage()}
            {country ? 
              <TouchableOpacity onPress={() => {
                SaveItem()
              }}>
                {favorite ? <MaterialCommunityIcons name="heart" color='#222222' size={40} /> : <MaterialCommunityIcons name="heart-outline" color='#222222' size={40} />}
              </TouchableOpacity>
            : null}
          </TopContainer>
          <BottomContainer>
            <CountryBorderLine>
              {country ? <Country>Made In {country.toUpperCase()}</Country> : <Country>No Country Result Found</Country>}
              {country_data ? <CountryData>{country_data}</CountryData> : <CountryData>No Description</CountryData>}
            </CountryBorderLine>

            <FiberBorderLine>
              <FiberTitle>Fiber Content</FiberTitle>
              {fibers ? renderFibers() : <NoResultText>No Results</NoResultText>}
            </FiberBorderLine>
             <View>   
              <CareTitle>Care Instructions</CareTitle>
            {fibers? 
              renderCareInstruction()
            : <NoResultText>No Results</NoResultText>}
            </View>
          </BottomContainer>
        </ScrollView>   
    )
}

export default ResultScreen;

const NoResultText = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: Raleway_400Regular_Italic;
  font-size: 18px;
  color: #222;
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

const StyledBorderLine = styled.View`
  border-bottom-width: .5px;
  border-bottom-color: grey;
  padding-bottom: 15px;
  margin-bottom: 0px;
`

const ItemTitle = styled.Text`
  font-family: Raleway_700Bold;
  font-size: 24px;
  letter-spacing: 2px;
  margin: 30px;
  margin-top: 25px;
  margin-bottom: 0px;
  text-align: center;
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