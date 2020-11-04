import React from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native';

function InstructionScreen({navigation}) {  
    return(
        <ScrollView style={{backgroundColor:'#FFF'}}>
            <StyledContatiner>
                <Title>Instructions</Title>
                <StepLabel>Step 1</StepLabel>
                <StyledText>Locate the clothing label. It usually is on the inside either at the lower side seam or back neck.</StyledText>
                <StepLabel>Step 2</StepLabel>
                <StyledText>Label Scanner needs fabric content and country of origin to generate the correct information for you! Usually both are on the front label, if not it is on the backside or on an additional label.</StyledText>
                <StepLabel>Step 3</StepLabel>
                <StyledText>Take photo of label/labels. Make sure the camera is focused and the image is not blurry for best results.</StyledText>
                <StepLabel>Step 4</StepLabel>
                <StyledText>Voila! Read up on where your garment is made, the content, and care instructions.</StyledText>
                <StyledBottomView>
                    <StyledButtonContatiner onPress={() => navigation.goBack()}>
                        <ButtonText>Go Back</ButtonText>
                    </StyledButtonContatiner>
                </StyledBottomView>
            </StyledContatiner>
        </ScrollView>
    )
}

export default InstructionScreen;

const StyledBottomView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    margin-top: 5px;
`

const StyledButtonContatiner = styled.TouchableOpacity`
    background-color: transparent;
    width: 300px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 2px solid black;
`

const ButtonText= styled.Text`
    color: black;
    font-family: Raleway_600SemiBold;
    font-size: 20px;
`

const StyledContatiner = styled.View`
    margin: 30px;
`

const Title = styled.Text`
    font-weight: bold;
    font-size: 35px;
    margin-bottom: 25px; 
`

const StepLabel = styled.Text`
    font-weight: bold;
    font-size: 25px;
`

const StyledText = styled.Text`
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 18px;
`

