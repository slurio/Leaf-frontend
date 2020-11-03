import React from 'react';
import { Text, Button, Image, View} from 'react-native';
import styled from 'styled-components';


function Fiber(props) {
    return(
        <View>
        {/* <FiberName>{props.percentage} {props.fiber.name}</FiberName> */}
        <FiberName>{props.fiber.name}</FiberName>
        <FiberDescription>{props.fiber.description}</FiberDescription>
        </View>
    )
}

export default Fiber;

const FiberName = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 2px;
`

const FiberDescription = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
`