import React from 'react'
import styled from 'styled-components/native'
import { Text, Button, View, Image} from 'react-native';

function OpenScreen({navigation}) {    
    return(
        <Background
            source={require('../assets/bg.png')}>
             <LogoContainer>
                 <Logo>The Thread</Logo>
             </LogoContainer>
             <Button title="Sign In" onPress={()=> navigation.navigate('SignInScreen')}/>
             <Button title="Sign Up" onPress={()=> navigation.navigate('SignupScreen')}/>
         </Background>
    )
}
export default OpenScreen;

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