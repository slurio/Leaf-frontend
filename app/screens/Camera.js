import React from 'react'
import styled from 'styled-components/native'
import { Text, Button } from 'react-native'

function Camera({navigation}) {
    return(
        <StyledView>
             <Text>Camera!</Text>
             <Button title="Go Back" onPress={()=> navigation.navigate('ScanScreen')}/>
         </StyledView>
    )
}

export default Camera;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 