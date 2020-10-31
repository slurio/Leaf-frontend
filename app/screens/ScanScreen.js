import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Text, Button, Image, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HOST_WITH_PORT, API_KEY } from '../environment';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ScanScreen({navigation, route}) {

    const images = route.params
    const [text,setText] = useState('')

    const handleSubmit = () => {

        fetch("https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY, {
            method: 'POST',
            body: JSON.stringify({
              "requests": [{
                "image": { "content": images.photos.base64},
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
        .then(itemData => navigation.navigate('ResultScreen', itemData))
      }
       
    return(
        <View>
         <StyledTopContainer>
             <Title>Upload Tag Images</Title>
             <Text>{text.toString()}</Text>
             <Instructions onPress={()=> console.log('instructions')}>Instructions</Instructions>
          </StyledTopContainer>
            <StyledView>
              {/* <Button title="Take Tag Images" onPress={()=> navigation.navigate('CameraScreen')}/> */}
              <View style={{flex: 1, justifyContent:'center', alignItems: 'center', top: 130}}>
              <StyledFrontLabel>Front Tag Image</StyledFrontLabel>
                <ImageContainer onPress={()=> navigation.navigate('CameraScreen')}>
                  <MaterialCommunityIcons style={{top: 40, marginLeft: 90}} name="camera" color='grey' size={130} />
                </ImageContainer>
              </View>

              <View style={{flex: 1, justifyContent:'center', alignItems: 'center', top: 375}}>
              <StyledFrontLabel>Back Tag Image</StyledFrontLabel>
                <ImageContainer onPress={()=> navigation.navigate('CameraScreen')}>
                  <MaterialCommunityIcons style={{top: 40, marginLeft: 90}} name="camera" color='grey' size={130} />
                </ImageContainer>
              </View>
              {images ?
                 images.photos.base64 ? 
                 <View>
                      <Text>Images Uploaded</Text>
                      <Image 
                      style={{width: 100, height: 100}}
                      source={{uri: `data:image/png;base64,${images.photos.base64}`}}/>
             
                  </View> 
                  : <View>
                     <Text>Front Tag</Text>
                     <Image 
                     style={{width: 100, height: 100}}
                     source={{uri: `data:image/png;base64,${images.photos[0].base64}`}}/>
                     <Text>Additional Tag</Text>
                     <Image 
                     style={{width: 100, height: 100}}
                     source={{uri: `data:image/png;base64,${images.photos[1].base64}`}}/>
                     </View>
                  : null}
              <SubmitButton onPress={()=> handleSubmit()}>
                  <StyledText>Submit</StyledText>
              </SubmitButton>
            </StyledView>
        </View>
        
    )
}

export default ScanScreen;
const StyledFrontLabel = styled.Text`
  position: absolute;
  top: -113px;
  font-size: 16px;

`

const StyledText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 20px;
`

const SubmitButton = styled.TouchableOpacity`
    background-color: #81A4CD;
    margin-left: 60px;
    width: 300px;
    height: 50px;
    align-items: center;
    justify-content: center;
    top: 300px;
`

const ImageContainer = styled.TouchableOpacity`
top: 15px;
  background-color: #B7D1D6;
  width: 300px;
  height: 200px;
`

const Title = styled.Text`
  margin-left: 60px;
  font-weight: bold;
  font-size: 28px;
`

const Instructions = styled.Text`
  margin-left: 60px;
  margin-top: 10px;
  font-size: 18px;
  text-decoration-line: underline;
`

const StyledTopContainer = styled.View`
  
`

const StyledView = styled.View`

` 