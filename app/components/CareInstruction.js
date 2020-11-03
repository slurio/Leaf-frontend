import React from 'react';
import styled from 'styled-components';


function CareInstruction(props) {
    return(
        <>
            <Instructions><Fiber>{props.fiber.name} Care:</Fiber> {props.fiber.care_instructions}</Instructions>
        </>
    )
}

export default CareInstruction;

const Fiber = styled.Text`
    font-size: 20px;
    font-family: Raleway_600SemiBold;
`

const Instructions = styled.Text`
    font-size: 18px;
    margin-top: 5px;
    font-family: Raleway_300Light_Italic;Raleway_300Light_Italic;
`