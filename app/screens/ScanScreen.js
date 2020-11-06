import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Alert, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HOST_WITH_PORT, API_KEY } from '../environment';
import { ScrollView } from 'react-native-gesture-handler';

//reduntant but for back image pass front image information along to additional camera screen and pass both results back to here
// add function to read back results ?
// pass both results to backend / have conditional to check if back image is there to send to back?

function ScanScreen({navigation, route}) {
    const[frontImg, setFrontImg] = useState('')
    const[backImg, setBackImg] = useState('')
    const [clothingDescription, setClothingDescription] = useState('')
    const [appReady, setAppReady] = useState(true)
   
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    useEffect(() => {
      if(route.params){
        setFrontImg(route.params.frontTag)
        setBackImg(route.params.backTag)
      }
    },[])

    const handleSubmit = () => {
      setAppReady(false)
      fetch("https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY, {
        method: 'POST',
        body: JSON.stringify({
          "requests": [{
          "image": { "content": frontImg.base64},
          "features": [
            { "type": "TEXT_DETECTION" }
            ]
          }]
        })
      })
      .then(response => { return response.json()})
      .then(jsonRes => {
        let text = jsonRes.responses[0].fullTextAnnotation.text
        backImg ? fetchBackTagText(text): renderTagText(text, false)
      }).catch(err => {
        console.log('Error', err)
      })
    }

    const fetchBackTagText = (frontTagText) => {
      console.log('here')
      fetch("https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY, {
        method: 'POST',
        body: JSON.stringify({
          "requests": [{
          "image": { "content": backImg.base64},
          "features": [
            { "type": "TEXT_DETECTION" }
            ]
          }]
        })
      })
      .then(response => { return response.json()})
      .then(jsonRes => {
        let text = jsonRes.responses[0].fullTextAnnotation.text
        renderTagText(frontTagText, text)
      }).catch(err => {
        console.log('Error', err)
      })
    }

    const renderTagText = (text, backText) => {
      
      (backText) ?
        tagObj = {
          front_tag_img: text,
          back_tag_img: backText
        }
      : 
        tagObj = {
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
      .then(itemData => navigation.push('ResultScreen', [itemData, {description: clothingDescription}]))
    }
       
    return(
      <ScrollView style={{backgroundColor:'white'}}>
        { appReady ?
        <ViewContatiner style={{backgroundColor:'white'}}>
          <Title>Upload Tag Images</Title>
          <Instructions onPress={()=> navigation.push('InstructionScreen')}>Instructions</Instructions>
          <BottomBorderLine>
            {frontImg ?
              <StyledTextInput
                placeholder="ITEM DESCRIPTION HERE"
                placeholderTextColor="grey"
                value={clothingDescription}
                onChangeText={text => setClothingDescription(text)}
              />
            : <MarginSpace/>}
          </BottomBorderLine>
          <ImageView>
            <StyledFrontLabel>FRONT TAG IMAGE</StyledFrontLabel>
            {frontImg ?
              <Img 
              style={{width: 290, height: 170}}
              source={{uri: `data:image/png;base64,${frontImg.base64}`}}/>
              :<ImageContainer onPress={()=> navigation.navigate('CameraScreen')}>
                <MaterialCommunityIcons style={{top: 34, marginLeft: 90}} name="camera" color='#7f7f7f' size={110} />
              </ImageContainer>
            }
            <StyledFrontLabel>BACK TAG IMAGE</StyledFrontLabel>
            { backImg ?
              <Img 
              style={{width: 290, height: 170}}
              source={{uri: `data:image/png;base64,${backImg.base64}`}}/>
            :
              <ImageContainer onPress={()=>
                navigation.navigate('AdditionalCameraScreen',{front_img: frontImg})
              }>
                <MaterialCommunityIcons style={{top: 34, marginLeft: 90}} name="camera" color='#7f7f7f' size={110} />
              </ImageContainer>
            }
            <SubmitButton onPress={()=> handleSubmit()}>
                <StyledText>Submit</StyledText>
            </SubmitButton>
          </ImageView>  
        </ViewContatiner> 
        :<LogoContainer style={{width: screenWidth, height: 750}}>
          <LogoImage source={require('../assets/whitethreadlogo.png')}/> 
          <Logo>threading your results...</Logo>
        </LogoContainer>
        }
      </ScrollView>        
    )
}

export default ScanScreen;

const MarginSpace = styled.Text`
  margin-bottom: 10px;
`

const BottomBorderLine = styled.View`
  border-bottom-width: .5px;
  border-bottom-color: grey;
  justify-content: center;
  align-items: center;
`

const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 30px;
`

const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #222;
`
const Logo = styled.Text`
  color: white;
  margin-top: 10px;
  font-size: 20px;
  font-family: Raleway_700Bold;
  letter-spacing: 2px;
`

const StyledTextInput = styled.TextInput`
  width: 300px;
  height: 35px;
  background-color: #ECECEC;
  margin-top: 20px;
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
  margin-top: 6px;
  background-color: #fff;
`

const Img = styled.Image`
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
    background-color: #2a2a2a;
    width: 290px;
    height: 60px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 2px solid black;
`

const ImageContainer = styled.TouchableOpacity`
  background-color: #ECECEC;
  width: 290px;
  height: 170px;
`

const Title = styled.Text`
  font-family: Raleway_600SemiBold;
  font-size: 28px;
  color: #3C413D;
  margin-top: 10px;
`

const Instructions = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  text-decoration-line: underline;
  font-family: Raleway_400Regular;
`
