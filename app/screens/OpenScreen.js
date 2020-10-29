import React from 'react'
import styled from 'styled-components/native'
import { Text, Button } from 'react-native';

function OpenScreen({navigation}) {
    
    return(
        <Background
        resizeMode=fit
            source={require('../assets/bg.png')}>
             <LogoContainer>
                 <Logo>ORIGIN</Logo>
             </LogoContainer>
             <Button title="Home Screen" onPress={()=> navigation.navigate('HomeNav')}/>
             <Button title="SignupScreen" onPress={()=> navigation.navigate('SignupScreen')}/>
         </Background>
    )
}

export default OpenScreen;

const Background = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`

const LogoContainer = styled.View`
    position: absolute;
    top: 50px;
    align-items: center;
`
const Logo = styled.Text`
    color: #222222;
    font-size: 45px;
    font-weight: bold;
    font-weight: bold;
    letter-spacing: 4px;
`