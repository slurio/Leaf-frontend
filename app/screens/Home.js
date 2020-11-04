import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { ScrollView, Image, View} from 'react-native'

import {useSelector} from 'react-redux'
import { HOST_WITH_PORT } from '../environment';

const Home = () => {
    const username = useSelector(state => state.user.username)
    const [facts, setFacts] = useState([])
    const [randomFact,setRandomFact] = useState('')

    useEffect(() => {
        fetch(`${HOST_WITH_PORT}/random_facts/`)
        .then(resp => resp.json())
        .then(factsdata => {
            setFacts(factsdata)
            fact = factsdata[Math.floor(Math.random() * facts.length)]['fact']
            setRandomFact(fact)
        })
    }, [])

    const renderNewFact = () => {
        fact = facts[Math.floor(Math.random() * facts.length)]['fact']
        setRandomFact(fact)
    }

    return(
        <ScrollView style={{backgroundColor:'#fff'}}>
            <StyledView>
                <GreetingContainer>
                    <Greeting>Welcome {username}!</Greeting>
                </GreetingContainer>
                <StyledText>DID YOU KNOW...</StyledText>
                <Fact>{randomFact}</Fact>
                <ButtonContainer>
                    <Button onPress={() => renderNewFact()}>
                        <ButtonText>Want to Know more?</ButtonText>
                    </Button>
                </ButtonContainer>
                <DesignerContainer>
                    <DesignerText>DESIGNER Of The Day</DesignerText>
                    <Image style={{width: 300, height:400, marginTop:20}} source={require('../assets/Nanushka.png')}/>
                    <DesignerName>NANUSHKA</DesignerName>              
                    <View style={{marginBottom:40}}>        
                        <DesignerBlurb>​Sandra Sandor is the mind behind Nanushka, a label that finds its origins in Budapest, Hungary. Starting from vegan leather and upcycled materials, she creates, bags, dresses, and shirts for both men and women. Her unique and simple style reveals her love of nature, and it is taking the fashion world by storm.​</DesignerBlurb>
                        <DesignerBlurb>Nanushka has implemented several sustainability initiatives that focus both on protecting the planet and creating a better working environment for its workers.</DesignerBlurb>
                        <DesignerBlurb>85% of the production still occurs in Hungary since this significantly contributes to cutting back its carbon footprint and allows for a transparent supply chain. Moreover, Sandra Sandor is sponsoring a Giving Back program to support non-profit organizations that promote this development in less fortunate areas of the world.</DesignerBlurb>
                    </View>
                </DesignerContainer>
            </StyledView>
        </ScrollView>
    )
}

export default Home;

const DesignerBlurb = styled.Text`
    font-family: Raleway_400Regular_Italic;
    font-size: 18px;
    color: #222;
    padding-top: 15px;
`

const DesignerName = styled.Text`
    padding-top: 10px;
    font-size: 30px;
    font-family: Raleway_600SemiBold;
    color: #222;
`

const DesignerContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    border-bottom-width: .5px;
    border-bottom-color: grey;
`

const GreetingContainer = styled.View`
    border-bottom-width: .5px;
    border-bottom-color: grey;
`

const ButtonText = styled.Text`
    padding: 10px;
    textAlign: center;
    color: #fff;
    font-size: 16px;
    font-family: Raleway_700Bold;
`

const Button = styled.TouchableOpacity`   
    align-items: center;
    justify-content: center;
    background-color: #222;
    width: 280px;
    height: 45px;
    margin-bottom: 40px;
`

const ButtonContainer = styled.View`
    justify-content: center;
    alignItems: center;
    margin-top: 60px;
    border-bottom-width: .5px;
    border-bottom-color: grey;
`

const StyledView = styled.View`
    flex: 1;
    margin: 30px;
    margin-top: 20px;
    background-color: #fff;
`

const StyledText = styled.Text`
    top: 30px;
    font-size: 20px;
    font-family: Raleway_700Bold;
    color: #222;
`

const DesignerText = styled.Text`
    font-size: 25px;
    font-family: Raleway_700Bold;
    color: #222;
    padding-top: 30px;
`

const Greeting = styled.Text`
    font-family: Raleway_600SemiBold;
    font-size: 28px;
    color: #3C413D;
    padding-bottom: 20px;
    textAlign: center;
`

const Fact = styled.Text`
    top: 35px;
    margin-top: 15px;
    font-family: Raleway_400Regular_Italic;
    font-size: 22px;
    color: #3C413D;
`
