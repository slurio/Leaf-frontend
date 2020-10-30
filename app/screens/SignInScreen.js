import React, {useState} from 'react'
import styled from 'styled-components/native'
import { TextInput, Button, TouchableOpacity, Text, View} from 'react-native'


function SignInScreen({navigation}) {
   const [username,setUsername] = useState('')
   const [password,setPassword] = useState('')

    const renderPassword = (text) => {
        setPassword(text)
    }

    const renderUsername = (text) => {
        setUsername(text)
    }
    
    return(
        <StyledView>
            <Logo>The Thread</Logo>
            <GreetingContainer>
                <SignIn>Sign In</SignIn>
                <Greeting>Hi there! Nice to see you again.</Greeting>
            </GreetingContainer>
             <StyledTextInput
                placeholder="Username"
                placeholderTextColor="#B7D1D6"
                value={username}
                onChangeText={text => renderUsername(text)}
             />
              <StyledTextInput
                placeholder="Password"
                placeholderTextColor="#B7D1D6"
                secureTextEntry={true}
                value={password}
                onChangeText={text => renderPassword(text)}
             />
             <Container onPress={()=> navigation.navigate('HomeNav')}>
                 <StyledButtonText>Enter!</StyledButtonText>
            </Container>
         </StyledView>
    )
}

export default SignInScreen;

// #222222

const Logo = styled.Text`
    color: #222;
    font-weight: bold;
    font-size: 60px;
    padding-bottom: 25px;
`

const GreetingContainer = styled.View`
    justify-content: flex-start;
`

const SignIn = styled.Text`
font-size: 32px;
color: #222;
font-weight: bold;
padding-bottom: 10px;
`

const Greeting = styled.Text`
font-size: 18px;
color: #222;
padding-bottom: 20px;
`

const Container = styled.TouchableOpacity`
width: 100px;
height: 100px;
borderRadius: 100px;
align-items: center;
justify-content: center;
margin-top: 10px;
background-color:#B7D1D6;
`

const StyledButtonText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 20px;
`


const StyledTextInput = styled.TextInput`
    width: 250px;
    height: 35px;
    background-color: white;
    margin: 10px;
    padding: 8px;
    borderRadius: 14px;
    font-size: 18px;
    font-weight: bold;
    color: #222;
`

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #dbf1da;
` 