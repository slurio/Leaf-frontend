import React, {useState} from 'react'
import styled from 'styled-components/native'

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/action'

import { HOST_WITH_PORT } from '../environment';

function SignInScreen({navigation}, props) {
   const [username,setUsername] = useState('')
   const [password,setPassword] = useState('')

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    if(user){
        navigation.navigate('HomeNav')
    }


    const renderPassword = (text) => {
        setPassword(text)
    }

    const renderUsername = (text) => {
        setUsername(text)
    }

    const submitHandler = () => {
        let userObj = {
            username: username,
            password: password
        }
        let options={
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(userObj)
            }
    
            fetch(`${HOST_WITH_PORT}/users/`, options)
            .then(resp=> resp.json())
            .then(data => dispatch(loginUser(data)))
        }    
    
    return(
        <StyledView>
            <StyledContainer>

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
             <Container onPress={()=> submitHandler()}>
                 <StyledButtonText>Enter!</StyledButtonText>
            </Container>
            <SignUpContainer>
                <StyledText>Don't have an account?</StyledText>
                <Link onPress={()=> navigation.navigate('SignupScreen')}>Sign Up</Link>
            </SignUpContainer>
            </StyledContainer>
         </StyledView>
    )
}

export default SignInScreen;

const StyledContainer = styled.View`
    top: 100px;
    align-items: center;
`

 const SignUpContainer = styled.View`
    margin-top: 15px;
    flex: 1;
    flex-direction: row;
    color: #222;
 `

 const StyledText = styled.Text`
    font-size: 16px;
    margin-right: 5px;

 `

 const Link = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-decoration-line: underline;
 `

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