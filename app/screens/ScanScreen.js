import React from 'react'
import styled from 'styled-components/native'
import { Text, Button, Image, View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function ScanScreen({navigation, route}) {

    const images = route.params
       
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
                    <Text>Images Uploaded</Text>
                    <Image 
                    style={{width: 100, height: 100}}
                    source={{uri: `data:image/png;base64,${images.photos[0].base64}`}}/>
                    <Text>Images Uploaded</Text>
                    <Image 
                    style={{width: 100, height: 100}}
                    source={{uri: `data:image/png;base64,${images.photos[1].base64}`}}/>
                    </View>
                 : null}
             {/* <Button title="Back Tag Image" onPress={()=> navigation.navigate('CameraScreen', "additional tag")}/> */}
            <Button title="submit" onPress={()=> console.log('submiting')}/>
         </StyledView>
    )
}

export default ScanScreen;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 