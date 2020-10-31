import React from 'react';
import { Text, Button, Image, View} from 'react-native';
import styled from 'styled-components';


function CareInstruction(props) {
    return(
        <>
            <Instructions>{props.instruction}</Instructions>
        </>
    )
}

export default CareInstruction;

const Instructions = styled.Text`
    font-size: 18px;
    margin-top: 5px;
`