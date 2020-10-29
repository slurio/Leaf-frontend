import React from 'react'
import styled from 'styled-components/native'
import { Text, Button } from 'react-native'

function ScanScreen({navigation, route}) {

    const frontTagImg = route.params
    const AdditionalTagImg = null
   console.log(route.params)

    // if(img !== undefined){console.log(img.base64)}
       
    return(
        <StyledView>
             <Text>Upload Tag Images</Text>
             <Button title="Instructions" onPress={()=> console.log('instructions')}/>
             <Button title="Front Tag Image" onPress={()=> navigation.navigate('CameraScreen')}/>
             <Button title="Back Tag Image" onPress={()=> navigation.navigate('CameraScreen', "additional tag")}/>
         </StyledView>
    )
}

export default ScanScreen;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 