
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';


function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
      
  if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref) ;
      }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              cameraRef.takePictureAsync({
                base64: true,
              }).then(data => {
                      console.log(data.base64)
                      });
              // let photo = await cameraRef.takePictureAsync(base64: true);
              // console.log('photo', photo);
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:"50%",
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:"50%",
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen




// import React from 'react'
// import styled from 'styled-components/native'
// import { Text, Button } from 'react-native'

// function CameraScreen({navigation}) {
//     return(
//         <StyledView>
//              <Text>CameraScreen!</Text>
//              <Button title="Go Back" onPress={()=> navigation.navigate('ScanScreen')}/>
//          </StyledView>
//     )
// }

// export default CameraScreen;

// const StyledView = styled.View`
//     flex: 1;
//     justify-content: center;
//     align-items: center;
// ` 