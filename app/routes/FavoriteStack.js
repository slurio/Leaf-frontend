import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'


const Favorites = () => {
    return(
       <StyledView>
           <Text>Favorites!</Text>
       </StyledView>
    )
}

export default Favorites;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 