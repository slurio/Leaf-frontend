
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert, Modal } from 'react-native';
import { Camera } from 'expo-camera';


function CameraScreen({navigation, route}) {
  console.log(route)
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisible] = useState(false);


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
          <TouchableOpacity style={{alignSelf: 'center', marginBottom:20}} onPress={async() => {
            if(cameraRef){
              photo = await cameraRef.takePictureAsync({base64: true});
              Alert.alert("Wish to retake 📷 ?", "Make sure you get as close as possible to tag and focus camera on it.", [
                {text: "Yes", onPress: () => null},
                {text: "No", onPress: () => navigation.push('ScanScreen', {frontTag: photo})}
              ])             
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