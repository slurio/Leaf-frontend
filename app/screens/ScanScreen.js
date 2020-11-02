import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Text, Alert, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HOST_WITH_PORT, API_KEY } from '../environment';
import { ScrollView } from 'react-native-gesture-handler';


function ScanScreen({navigation, route}) {

    const [text,setText] = useState('')
    const[frontImg, setFrontImg] = useState('')
    const [clothingDescription, setClothingDescription] = useState('')

    useEffect(() => {
      setFrontImg(route.params)
    },[])

    const handleSubmit = () => {

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
        <ViewContatiner style={{backgroundColor:'white'}}>
       
             <Title>Upload Tag Images</Title>
             <Instructions onPress={()=> navigation.push('InstructionScreen')}>Instructions</Instructions>
       

              <ImageView>
              <StyledTextInput
                  placeholder="Clothing Description"
                  placeholderTextColor="grey"
                  value={clothingDescription}
                  onChangeText={text => setClothingDescription(text)}
              />
              <StyledFrontLabel>Front Tag Image</StyledFrontLabel>
              { frontImg ? 
                <FrontImg 
                style={{width: 300, height: 200}}
                source={{uri: `data:image/png;base64,${frontImg.frontTag.base64}`}}/>
                :<ImageContainer onPress={()=> navigation.navigate('CameraScreen')}>
                  <MaterialCommunityIcons style={{top: 40, marginLeft: 90}} name="camera" color='grey' size={130} />
                </ImageContainer>
              }
           
              <StyledFrontLabel>Back Tag Image</StyledFrontLabel>
                <ImageContainer onPress={()=> 
                  Alert.alert("Sorry!","This feature is coming soon", [
                    {text: "Ok", onPress: () => null}
                  ]) 
                }>
                  <MaterialCommunityIcons style={{top: 40, marginLeft: 90}} name="camera" color='grey' size={130} />
                </ImageContainer>
                <SubmitButton onPress={()=> handleSubmit()}>
                    <StyledText>SUBMIT</StyledText>
                </SubmitButton>
              </ImageView>
        
        </ViewContatiner>
      </ScrollView>
        
    )
}

export default ScanScreen;

const StyledTextInput = styled.TextInput`
    width: 300px;
    height: 35px;
    background-color: lightgrey;
    margin: 10px;
    margin-top: 15px;
    padding: 8px;
    borderRadius: 10px;
    font-size: 18px;
    font-family: Raleway_300Light;
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
  font-size: 16px;
  font-family: Raleway_400Regular;
  margin-bottom: 10px;
  margin-top: 10px;
`

const StyledText = styled.Text`
    color: black;
    font-family: Raleway_600SemiBold;
    font-size: 20px;
`

const SubmitButton = styled.TouchableOpacity`
    background-color: transparent;
    width: 300px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 2px solid black;
`

const ImageContainer = styled.TouchableOpacity`

  background-color: lightgrey;
  width: 300px;
  height: 200px;
`

const Title = styled.Text`
  font-size: 28px;
  font-family: Raleway_500Medium;
`

const Instructions = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  text-decoration-line: underline;
  font-family: Raleway_400Regular;
`
