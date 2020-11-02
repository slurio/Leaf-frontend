import React from 'react'
import styled from 'styled-components/native'

function OpenScreen({navigation}, props) {  
    console.log(props)  
    return(
        <Background
            source={require('../assets/logo.png')}>
             <LogoContainer> 
                 <Logo>THE</Logo>
                 <Logo>THREAD</Logo>
             </LogoContainer>
             <LogInButton onPress={()=> navigation.navigate('SignInScreen')}>
                <StyledSignInText>SIGN IN</StyledSignInText>
             </LogInButton>
             <SignUpButton onPress={()=> navigation.navigate('SignupScreen')}>
                <StyledText>REGISTER</StyledText>
             </SignUpButton>
         </Background>
    )
}

export default OpenScreen;

const StyledText = styled.Text`
    color: #3C413D;
    font-weight: bold;
    font-size: 20px;
    font-family: Raleway_600SemiBold;
`

const StyledSignInText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    font-family: Raleway_600SemiBold;
`

const LogInButton = styled.TouchableOpacity`
    width: 190px;
    height: 55px;
    top: -60px;
    align-items: center;
    justify-content: center;
    background-color: #3C413D;
`
const SignUpButton = styled.TouchableOpacity`
    width: 190px;
    height: 55px;
    top: -40px;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #3C413D;
`
const Background = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  resizeMode: stretch;
` 

const LogoContainer = styled.View`
    position: absolute;
    top: 110px;
    align-items: center;
`
const Logo = styled.Text`
    color: #3C413D;
    top: 2px;
    font-size: 50px;
    font-weight: bold;
    letter-spacing: 5px;
    font-family: Raleway_600SemiBold;
`