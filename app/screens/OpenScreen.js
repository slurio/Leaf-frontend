import React from 'react'
import styled from 'styled-components/native'

function OpenScreen({navigation}, props) {  
    return(
        <StyledView>
            <LogoContainer>
                <LogoImage source={require('../assets/threadlogo.png')}/> 
                <Logo>THE THREAD</Logo>
            </LogoContainer>
            <LogInButton onPress={()=> navigation.navigate('SignInScreen')}>
            <StyledSignInText>LOGIN</StyledSignInText>
            </LogInButton>
            <SignUpButton onPress={()=> navigation.navigate('SignupScreen')}>
            <StyledText>SIGN UP</StyledText>
            </SignUpButton>
        </StyledView>
    )
}

export default OpenScreen;

const LogoImage = styled.Image`
    width: 150px;
    height: 150px;
`

const StyledText = styled.Text`
    color: #3C413D;
    font-weight: bold;
    font-size: 17px;
    font-family: Raleway_700Bold;
`

const StyledSignInText = styled.Text`
    color: #3C413D;
    font-weight: bold;
    font-size: 17px;
    font-family: Raleway_700Bold;
    letter-spacing: 2px;
`

const LogInButton = styled.TouchableOpacity`
    width: 160px;
    height: 45px;
    top: -180px;
    align-items: center;
    justify-content: center;
    background-color:#A6BDB7;
    border-radius: 10px;
`
const SignUpButton = styled.TouchableOpacity`
    width: 160px;
    height: 45px;
    top: -160px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 2px solid #3C413D;
`
const StyledView = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  resizeMode: stretch;
  background-color:#DBDED5;
` 

const LogoContainer = styled.View`
    align-items: center;
    top: -220px;
`
const Logo = styled.Text`
    color: #3C413D;
    font-size: 50px;
    font-weight: 500;
`