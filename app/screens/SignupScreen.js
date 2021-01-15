import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import { useSelector, useDispatch } from 'react-redux';
import { signUpUser } from '../redux/action';

import { HOST_WITH_PORT } from '../environment';

function SignupScreen({ navigation }) {
    const [username,setUsername] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const newUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(newUser){
            setUsername('')
            setName('')
            setPassword('')
            setPasswordConfirmation('')
            navigation.navigate('HomeNav') 
        }
    })

    const submitHandler = () => {
        let userObj = {
            username: username,
            name: name,
            password: password,
            passwordConfirm: passwordConfirmation,
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
        .then(newUser => dispatch(signUpUser(newUser)))
    }

    return(
        <StyledView>
            <StyledContainer>
                <Logo>THE THREAD</Logo>
                <GreetingContainer>
                    <SignIn>Sign Up</SignIn>
                    <Greeting>We are excited for you to join!</Greeting>
                </GreetingContainer>
                {newUser === false ? <Error>Email exists or Passwords do not match!</Error> : null}
                <StyledTextInput
                    placeholder="Email Address"
                    autoCapitalize = 'none'
                    placeholderTextColor="grey"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <StyledTextInput
                    placeholder="Your Name"
                    placeholderTextColor="grey"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <StyledTextInput
                    placeholder="Password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <StyledTextInput
                    placeholder="Password Confirmation"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    value={passwordConfirmation}
                    onChangeText={text => setPasswordConfirmation(text)}
                />
                <Container onPress={()=> submitHandler()}>
                    <StyledButtonText>SIGN UP</StyledButtonText>
                </Container>
                <SignUpContainer>
                    <StyledText>Have an account?</StyledText>
                    <Link onPress={()=> navigation.navigate('SignInScreen')}>Sign In</Link>
                </SignUpContainer>
            </StyledContainer>
         </StyledView>
    )
}

export default SignupScreen;

const Error = styled.Text`
    font-size: 16px;
    font-family: Raleway_600SemiBold;
    color: red;
`

const StyledContainer = styled.View`
    top: 50px;
    align-items: center;
`

 const SignUpContainer = styled.View`
    margin-top: 20px;
    flex: 1;
    flex-direction: row;
    color: #fff;
 `

 const StyledText = styled.Text`
    font-size: 16px;
    margin-right: 5px;
    font-family: Raleway_300Light;
    color: #222;
 `

 const Link = styled.Text`
    font-size: 16px;
    text-decoration-line: underline;
    font-family: Raleway_600SemiBold;
 `

const Logo = styled.Text`
    color: #222;
    font-size: 50px;
    font-weight: 500;
    padding-bottom: 25px;
`

const GreetingContainer = styled.View`
    justify-content: flex-start;
`

const SignIn = styled.Text`
    margin-bottom: 10px;
    font-size: 32px;
    color: #222;
    font-family: Raleway_600SemiBold;
`

const Greeting = styled.Text`
    font-size: 18px;
    color: #222;
    padding-bottom: 20px;
    font-family: Raleway_300Light;
`

const Container = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    borderRadius: 100px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    border: 2px solid black;
`

const StyledButtonText = styled.Text`
    color: #222;
    font-size: 20px;
    font-family: Raleway_500Medium;
`

const StyledTextInput = styled.TextInput`
    width: 250px;
    height: 45px;
    background-color: #ECECEC;
    margin: 10px;
    padding: 8px;
    borderRadius: 14px;
    font-size: 18px;
    font-family: Raleway_300Light;
`

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #fff;
` 