import React from 'react'
import styled from 'styled-components/native'
import { Text, Button, View, Image} from 'react-native';
import {connect} from 'react-redux';

function OpenScreen({navigation}, props) {  
    console.log(props)  
    return(
        <Background
            source={require('../assets/bg.png')}>
             <LogoContainer>
                 <Logo>The Thread</Logo>
             </LogoContainer>
             <LogInButton onPress={()=> navigation.navigate('SignInScreen')}>
                <StyledText>Sign In!</StyledText>
             </LogInButton>
             <SignUpButton onPress={()=> navigation.navigate('SignupScreen')}>
                <StyledText>Sign Up!</StyledText>
             </SignUpButton>
         </Background>
    )
}

export default OpenScreen;

const StyledText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 20px;
`

const LogInButton = styled.TouchableOpacity`
    width: 450px;
    height: 70px;
    align-items: center;
    justify-content: center;
    background-color:#B7D1D6;
`
const SignUpButton = styled.TouchableOpacity`
    width: 450px;
    height: 70px;
    align-items: center;
    justify-content: center;
    background-color:#81A4CD;
`
const Background = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  resizeMode: stretch;
` 

const LogoContainer = styled.View`
    position: absolute;
    top: 100px;
    align-items: center;
`
const Logo = styled.Text`
    color: #222222;
    font-size: 45px;
    font-weight: bold;
    letter-spacing: 4px;
`