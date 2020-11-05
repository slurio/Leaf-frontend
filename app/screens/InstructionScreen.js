import React from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native';

function InstructionScreen({navigation}) {  
    return(
        <ScrollView style={{backgroundColor:'#FFF'}}>
            <StyledContatiner>
                <InstructionContainer>
                    <Title>INSTRUCTIONS</Title>
                </InstructionContainer>
                <StyledText><StepLabel>1.</StepLabel> Locate the clothing label. It usually is on the inside either at the lower side seam or back neck.</StyledText>
                <StyledText><StepLabel>2.</StepLabel> Label Scanner needs fabric content and country of origin to generate the correct information for you! Usually both are on the front label, if not locate them on the backside or on an additional label.</StyledText>
                <StyledText><StepLabel>3.</StepLabel> Take photo of label/labels. Make sure the camera is focused and the image is not blurry for best results.</StyledText>
                <StyledText><StepLabel>4.</StepLabel> Name your scanned item. The more specific the better, so you can view for later use.</StyledText>
                <StyledText><StepLabel>5.</StepLabel> Now just press submit and voila! Read up on where your garment is made, the fabric content, and care instructions.</StyledText>
                <StyledBottomView>
                    <StyledButtonContatiner onPress={() => navigation.goBack()}>
                        <ButtonText>GO BACK</ButtonText>
                    </StyledButtonContatiner>
                </StyledBottomView>
            </StyledContatiner>
        </ScrollView>
    )
}

export default InstructionScreen;

const InstructionContainer = styled.View`
    border-bottom-width: .5px;
    border-bottom-color: grey;
    margin-bottom: 22px;
`

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
    background-color: black;
`

const ButtonText= styled.Text`
    color: #fff;
    font-family: Raleway_700Bold;
    font-size: 18px;
    letter-spacing: 3px;
`

const StyledContatiner = styled.View`
    margin: 30px;
`

const Title = styled.Text`
    font-family: Raleway_600SemiBold;
    font-size: 28px;
    color: #3C413D;
    margin-bottom: 20px; 
`

const StepLabel = styled.Text`
    font-weight: bold;
    font-size: 28px;
    font-family: Raleway_600SemiBold;
`

const StyledText = styled.Text`
    margin-top: 0px;
    margin-bottom: 20px;
    font-family: Raleway_400Regular_Italic;
    font-size: 18px;
    color: #222;
`

