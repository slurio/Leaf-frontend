import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { ScrollView, View, Text } from 'react-native'

import {useSelector} from 'react-redux'
import { HOST_WITH_PORT } from '../environment';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <Greeting>Welcome {username}!</Greeting>
            <StyledText>Did you know...</StyledText>
            <Fact>{randomFact}</Fact>
                <ButtonContainer>
                    <Button onPress={() => renderNewFact()}>
                        <ButtonText>Want to Know more?</ButtonText>
                    </Button>
                </ButtonContainer>
         </StyledView>
        </ScrollView>
    )
}

export default Home;

const ButtonText = styled.Text`
    padding: 10px;
    textAlign: center;
    color: #fff;
    font-size: 16px;
    font-family: Raleway_700Bold;
`

const Button = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    borderRadius: 100px;
    align-items: center;
    justify-content: center;
    background-color: #A6BDB7;
`

const ButtonContainer = styled.View`
    justify-content: center;
    alignItems: center;
    margin-top: 80px;
`

const StyledView = styled.View`
    flex: 1;
    margin: 30px;
    margin-top: 10px;
    background-color: #fff;
`

const StyledText = styled.Text`
    top: 30px;
    font-size: 20px;
    font-family: Raleway_700Bold;
    color: #A6BDB7;
    textAlign: center;
`

const Greeting = styled.Text`
    font-family: Raleway_600SemiBold;
    font-size: 35px;
    color: #3C413D;
`

const Fact = styled.Text`
    top: 50px;
    font-family: Raleway_400Regular_Italic;
    font-size: 30px;
    color: #3C413D;
`
