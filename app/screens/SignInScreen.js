import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/action'

import { HOST_WITH_PORT } from '../environment';

function SignInScreen({navigation}, props) {
   const [userEmail,setUserEmail] = useState('')
   const [password,setPassword] = useState('')

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(user){
            navigation.navigate('HomeNav') 
        }
    })

    const renderPassword = (text) => {
        setPassword(text)
    }

    const renderUser = (text) => {
        setUserEmail(text)
    }

    const submitHandler = () => {
        let userObj = {
            username: userEmail,
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

            <Logo>THE THREAD</Logo>
            <GreetingContainer>
                <SignIn>Sign In</SignIn>
                <Greeting>Hi there! Nice to see you again.</Greeting>
            </GreetingContainer>
            {user === false ? <Error>Password incorrect or no known user</Error> : null}
             <StyledTextInput
                placeholder="Email Address"
                autoCapitalize = 'none'
                placeholderTextColor="grey"
                value={userEmail}
                onChangeText={text => renderUser(text)}
             />
              <StyledTextInput
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry={true}
                value={password}
                onChangeText={text => renderPassword(text)}
             />
             <Container onPress={()=> submitHandler()}>
                 <StyledButtonText>ENTER</StyledButtonText>
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

const Error = styled.Text`
    font-size: 16px;
    font-family: Raleway_600SemiBold;
    color: red;
`

const StyledContainer = styled.View`
    top: 100px;
    align-items: center;
`
 const SignUpContainer = styled.View`
    margin-top: 15px;
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
    font-size: 32px;
    color: #222;
    padding-bottom: 10px;
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
    height: 35px;
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