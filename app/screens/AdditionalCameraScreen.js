
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

import { FancyAlert } from 'react-native-expo-fancy-alerts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

function AdditionalCameraScreen({navigation, route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisibility] = useState(false)

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

  const renderResult = () => {
      navigation.push('ScanScreen', {backTag: photo, frontTag: route.params.front_img})
      setModalVisibility(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref) ;
      }}>
        <TouchableOpacity onPress={()=> navigation.navigate('ScanScreen')}>
          <MaterialCommunityIcons style={{marginTop: 10}} name="chevron-left" color='white' size={75} />
        </TouchableOpacity>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}
        >
        {modalVisible ?     
          <FancyAlert
            visible={modalVisible}
            icon={<Circle><Text><MaterialCommunityIcons name="check" color='white' size={40} /></Text></Circle>}
            style={{ backgroundColor: 'white' }}
          >
            <ModalText>IMAGE SUCCESS!</ModalText>
            <ButtonContainer>
              <ProceedButton onPress={() => renderResult()}>
                <ProceedButtonText>PROCEED</ProceedButtonText>
              </ProceedButton>
              <RetakeButton onPress={() => setModalVisibility(false)}>
                <RetakeButtonText>RETAKE</RetakeButtonText>
              </RetakeButton>
            </ButtonContainer>
          </FancyAlert>
        : null}

          <TouchableOpacity style={{alignSelf: 'center', marginBottom:20}} onPress={async() => {
            if(cameraRef){
              photo = await cameraRef.takePictureAsync({base64: true});
              setModalVisibility(true)       
            }
          }}>
            <OuterCircleButton>
              <InnerCircleButton></InnerCircleButton>
            </OuterCircleButton>
          </TouchableOpacity>
        </SafeAreaView>
      </Camera>
    </SafeAreaView>
  );
}

export default AdditionalCameraScreen;

const RetakeButtonText = styled.Text`
  text-align: center;
  color: #222;
  font-weight: bold;
  font-size: 14px;
  font-family: Raleway_700Bold;
`

const ProceedButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    font-family: Raleway_700Bold;
`

const ProceedButton = styled.TouchableOpacity`
  margin-right: 10px;
  margin-top: -5px;
  padding-top: 10px;
  background-color: black;
  width: 120px;
  height: 40px;
`

const RetakeButton = styled.TouchableOpacity`
  padding-top: 10px
  margin-top: -5px;
  margin-bottom: 20px;
  border: 1.5px solid black;
  width: 120px;
  height: 40px;
`

const ButtonContainer = styled.View`
  flex-direction: row;
`

const InnerCircleButton = styled.View`
  border-width: 2px;
  border-radius: 50px;
  border-color: white;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const OuterCircleButton = styled.View`
  border-width: 2px;
  border-radius: 50px;
  border-color: white;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalText = styled.Text`
  margin-top: -16px;
  margin-bottom: 32px;
  color: #222;
  font-weight: bold;
  font-size: 22px;
  font-family: Raleway_700Bold;
`

const Circle = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 50px;
  width: 100%;
`
