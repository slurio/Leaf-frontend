import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native';
import { ActivityIndicator,Text } from 'react-native';

import { FancyAlert } from 'react-native-expo-fancy-alerts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HOST_WITH_PORT, API_KEY } from '../environment';
import { ScrollView } from 'react-native-gesture-handler';

function ScanScreen({navigation, route}) {
    const[frontImg, setFrontImg] = useState('')
    const[backImg, setBackImg] = useState('')
    const [clothingDescription, setClothingDescription] = useState('')
    const [appReady, setAppReady] = useState(true)
    const [modalVisible, setModalVisibility] = useState(false)
    const [error, setError] = useState(false)

    let screenWidth = Dimensions.get('window').width;

    useEffect(() => {
      if(route.params){
        setFrontImg(route.params.frontTag)
        setBackImg(route.params.backTag)
      }
    },[])

    const handleSubmit = () => {
      if(frontImg) {
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
          console.log('ERROR :', err)
          setError(true)
        })
      } else {
        setModalVisibility(true) 
      }
    }

    const fetchBackTagText = (frontTagText) => {
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
      .then(itemData => {
        navigation.push('ResultScreen', [itemData, {description: clothingDescription}])
        setAppReady(true)
        setFrontImg('')
        setBackImg('')
      })
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
          <Logo>threading your results</Logo>
          <ActivityIndicator style={{marginTop:20}} size="large" color="white" />
        </LogoContainer>
        }
        {modalVisible ?     
          <FancyAlert
            visible={modalVisible}
            icon={<Circle><Text><MaterialCommunityIcons name="close" color='black' size={45} /></Text></Circle>}
            style={{ backgroundColor: 'black' }}
          >
            <ModalText>Must submit front tag image</ModalText>
            <ButtonContainer>
              <RetakeButton onPress={() => setModalVisibility(false)}>
                <RetakeButtonText>OK</RetakeButtonText>
              </RetakeButton>
            </ButtonContainer>
          </FancyAlert>
        : null}

        {error ?     
          <FancyAlert
            visible={error}
            icon={<ErrorCircle><Text><MaterialCommunityIcons name="close" color='white' size={45} /></Text></ErrorCircle>}
            style={{ backgroundColor: 'white' }}
          >
            <ModalErrorText>No Text Detected</ModalErrorText>
            <ButtonContainer>
              <OkayButton onPress={() => {
                setError(false)
                setAppReady(true)
                setFrontImg('')
                setBackImg('')
              }}>
                <OkayButtonText>OK</OkayButtonText>
              </OkayButton>
            </ButtonContainer>
          </FancyAlert>
        : null}
      </ScrollView>        
    )
}

export default ScanScreen;

const MarginSpace = styled.Text`
  margin-bottom: 10px;
`

const ErrorCircle = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 50px;
  width: 100%;
`

const OkayButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    font-family: Raleway_700Bold;
`

const OkayButton = styled.TouchableOpacity`
  margin-right: 10px;
  margin-top: -5px;
  padding-top: 10px;
  margin-bottom: 20px;
  background-color: black;
  width: 120px;
  height: 40px;
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
  margin-top: 60px;
`

const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
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

const RetakeButtonText = styled.Text`
  text-align: center;
  color: #222;
  font-weight: bold;
  font-size: 20px;
  font-family: Raleway_700Bold;
`

const RetakeButton = styled.TouchableOpacity`
  padding-top: 10px
  margin-top: -5px;
  margin-bottom: 20px;
  background-color: white
  width: 120px;
  height: 40px;
`

const ButtonContainer = styled.View`
  flex-direction: row;
`

const ModalText = styled.Text`
  margin-top: -16px;
  margin-bottom: 32px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  font-family: Raleway_600SemiBold;
`

const ModalErrorText = styled.Text`
  margin-top: -18px;
  margin-bottom: 32px;
  color: black;
  font-weight: bold;
  font-size: 20px;
  font-family: Raleway_600SemiBold;
`

const Circle = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  width: 100%;
`
