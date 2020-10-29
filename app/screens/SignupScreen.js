import React from 'react'
import styled from 'styled-components/native'
import { Text, Button } from 'react-native'

function SignupScreen({navigation}) {
    return(
        <StyledView>
             <Text>Sign up Below!</Text>
             <Button title="Home Screen" onPress={()=> navigation.navigate('HomeNav')}/>
         </StyledView>
    )
}

export default SignupScreen;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 