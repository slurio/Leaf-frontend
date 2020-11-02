import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
// import { Entypo } from '@expo/vector-icons';


const Favorites = () => {
    return(
       <StyledView>
           <Text>Favorites!</Text>
           {/* <Entypo name="home" size={24} color="black" /> */}
       </StyledView>
    )
}

export default Favorites;

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #fff;
` 