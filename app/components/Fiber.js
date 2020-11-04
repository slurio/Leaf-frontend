import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';


function Fiber(props) {
    return(
        <View>
            <FiberName>{props.percentage} {props.fiber.name.toUpperCase()}</FiberName>
            <FiberDescription>{props.fiber.description}</FiberDescription>
        </View>
    )
}

export default Fiber;

const FiberName = styled.Text`
    font-size: 20px;
    font-family: Raleway_600SemiBold;
    margin-top: 10px;
`

const FiberDescription = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
    font-family: Raleway_400Regular_Italic;
`