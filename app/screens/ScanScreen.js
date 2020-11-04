import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HOST_WITH_PORT, API_KEY } from '../environment';
import { ScrollView } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

function ScanScreen({navigation, route}) {

    const [text,setText] = useState('')
    const[frontImg, setFrontImg] = useState('')
    const [clothingDescription, setClothingDescription] = useState('')

    const [appReady, setAppReady] = useState(true)

    useEffect(() => {
      setFrontImg(route.params)
    },[])

    const handleSubmit = () => {
        setAppReady(false)
        fetch("https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY, {
            method: 'POST',
            body: JSON.stringify({
              "requests": [{
                "image": { "content": frontImg.frontTag.base64},
                "features": [
                    { "type": "TEXT_DETECTION" }
                ]}]
          })
        })
        .then(response => { return response.json()})
        .then(jsonRes => {
          let text = jsonRes.responses[0].fullTextAnnotation.text
          setText(text)
          renderTagText(text)
        }).catch(err => {
          console.log('Error', err)
        })
      }

      const renderTagText = (text) => {

        let tagObj = {
          front_tag_img: text
        }

        let options={
          method: "POST",
          headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
          },
          body: JSON.stringify(tagObj)
        }

        fetch(`${HOST_WITH_PORT}/items/`, options)
        .then(resp => resp.json())
        //navigate to result page to display result
        // pass the results with it
        .then(itemData => navigation.navigate('ResultScreen', [itemData, {description: clothingDescription}]))
      }
       
    return(
      <ScrollView style={{backgroundColor:'white'}}>
        { appReady ?
        <ViewContatiner style={{backgroundColor:'white'}}>
       
             <Title>Upload Tag Images</Title>
             <Instructions onPress={()=> navigation.push('InstructionScreen')}>Instructions</Instructions>
       

              <BottomBorderLine>
                <StyledTextInput
                    placeholder="ITEM DESCRIPTION HERE"
                    placeholderTextColor="grey"
                    value={clothingDescription}
                    onChangeText={text => setClothingDescription(text)}
                />
              </BottomBorderLine>
              <ImageView>
              <StyledFrontLabel>FRONT TAG IMAGE</StyledFrontLabel>
              { frontImg ? 
                <FrontImg 
                style={{width: 270, height: 160}}
                source={{uri: `data:image/png;base64,${frontImg.frontTag.base64}`}}/>
                :<ImageContainer onPress={()=> navigation.navigate('CameraScreen')}>
                  <MaterialCommunityIcons style={{top: 30, marginLeft: 80}} name="camera" color='#3f3f3f' size={110} />
                </ImageContainer>
              }
           
              <StyledFrontLabel>BACK TAG IMAGE</StyledFrontLabel>
                <ImageContainer onPress={()=> 
                  Alert.alert("Sorry!","This feature is coming soon", [
                    {text: "Ok", onPress: () => null}
                  ]) 
                }>
                  <MaterialCommunityIcons style={{top: 30, marginLeft: 80}} name="camera" color='#3f3f3f' size={110} />
                </ImageContainer>
                <SubmitButton onPress={()=> handleSubmit()}>
                    <StyledText>Submit</StyledText>
                </SubmitButton>
              </ImageView>
        
        </ViewContatiner> 
        :<LogoContainer>
              <LogoImage source={require('../assets/threadlogo.png')}/> 
              <Logo>threading your results...</Logo>
          </LogoContainer>
        }
      </ScrollView>        
    )
}

export default ScanScreen;

const BottomBorderLine = styled.View`
  border-bottom-width: .5px;
  border-bottom-color: grey;
  justify-content: center;
  align-items: center;
`

const LogoImage = styled.Image`
    width: 100px;
    height: 100px;
`

const LogoContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    top: 200px;
`
const Logo = styled.Text`
  margin-top: 25px;
  color: #3C413D;
  font-size: 20px;
  font-weight: 300;
`

const StyledTextInput = styled.TextInput`
    width: 300px;
    height: 35px;
    background-color: #ECECEC;
    margin-top: 28px;
    margin-bottom: 18px;
    padding-left: 20px;
    borderRadius: 10px;
    font-size: 14px;
    letter-spacing: 2px;
    font-family: Raleway_500Medium;
`

const ViewContatiner = styled.View`
  flex: 1;
  margin: 30px;
  margin-top: 10px;
  background-color: #fff;
`

const FrontImg = styled.Image`
  
`

const ImageView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  margin-top: 5px;
`

const StyledFrontLabel = styled.Text`
  font-size: 14px;
  font-family: Raleway_600SemiBold;
  margin-bottom: 5px;
  margin-top: 12px;
`

const StyledText = styled.Text`
    color: #fff;
    font-family: Raleway_700Bold;
    font-size: 18px;
    letter-spacing: 3px;
`

const SubmitButton = styled.TouchableOpacity`
    background-color: #222;
    width: 300px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    border: 2px solid black;
`

const ImageContainer = styled.TouchableOpacity`

  background-color: #ECECEC;
  width: 270px;
  height: 160px;
`

const Title = styled.Text`
  font-family: Raleway_600SemiBold;
    font-size: 28px;
    color: #3C413D;
`

const Instructions = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  text-decoration-line: underline;
  font-family: Raleway_400Regular;
`
