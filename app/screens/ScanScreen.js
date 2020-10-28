import React from 'react'
import styled from 'styled-components/native'
import { Text, Button } from 'react-native'

function ScanScreen({navigation}) {
    return(
        <StyledView>
             <Text>Scan Here!</Text>
             <Button title="Camera" onPress={()=> navigation.navigate('Camera')}/>
         </StyledView>
    )
}

export default ScanScreen;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 