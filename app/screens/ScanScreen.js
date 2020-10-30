import React from 'react'
import styled from 'styled-components/native'
import { Text, Button, Image, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';


import { HOST_WITH_PORT, API_KEY } from '../environment';

function ScanScreen({navigation, route}) {

    const images = route.params

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
          console.log(text)
        }).catch(err => {
          console.log('Error', err)
        })
      }

        // if(images.photos.base64){
        //     tagObj = {
        //         front_tag_img: images.photos.base64
        //     }

        //     let options={
        //         method: "POST",
        //         headers: {
        //             'content-type': 'application/json',
        //             'accept': 'application/json'
        //         },
        //         body: JSON.stringify(tagObj)
        //     }
        //     fetch(`${HOST_WITH_PORT}/items/`, options)
        //     .then(resp => resp.json())
        //     .then(data => console.log(data))
        // }else{
        //     tagObj = {
        //         front_tag_img: route.params.photos[0].base64,
        //         back_tag_img: route.params.photos[1].base64
        //     }

        //     let options={
        //         method: "POST",
        //         headers: {
        //             'content-type': 'application/json',
        //             'accept': 'application/json'
        //         },
        //         body: JSON.stringify(tagObj)
        //     }
        //     fetch(`${HOST_WITH_PORT}/items/`, options)
        //     .then(resp => resp.json())
        //     .then(data => console.log(data))
        // } 
       
    return(
        <StyledView>
             <Text>Upload Tag Images</Text>
             <Button title="Instructions" onPress={()=> console.log('instructions')}/>
             {/* <Button title="Front Tag Image" onPress={()=> navigation.navigate('CameraScreen')}/> */}
             <Button title="Take Tag Images" onPress={()=> navigation.navigate('CameraScreen')}/>
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
             {/* <Button title="Back Tag Image" onPress={()=> navigation.navigate('CameraScreen', "additional tag")}/> */}
            <Button title="submit" onPress={()=> handleSubmit()}/>
         </StyledView>
    )
}


const mdp = (dispatch) => {
    // return { submitHandler: (note) => dispatch(addNote(note))}
}

export default connect(null, mdp)(ScanScreen);

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 