import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native'

import {useSelector} from 'react-redux'
import { HOST_WITH_PORT } from '../environment';

const Home = () => {
    const username = useSelector(state => state.user)
    const [randomFact,setRandomFact] = useState('')

    useEffect(() => {
        fetch(`${HOST_WITH_PORT}/random_facts/`)
        .then(resp => resp.json())
        .then(fact => setRandomFact(fact.fact))
    }, [])

    return(
        <ScrollView style={{backgroundColor:'#DBDED5'}}>
        <StyledView>        
            <Greeting>Welcome {username}!</Greeting>
            <StyledText>Did you know...</StyledText>
            <Fact>{randomFact}</Fact>
         </StyledView>
        </ScrollView>
    )
}

export default Home;

const StyledView = styled.View`
    flex: 1;
    margin: 30px;
`

const StyledText = styled.Text`
    top: 30px;
    font-size: 20px;
    font-family: Raleway_700Bold;
    color: #A6BDB7;
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
    color: #38603E;
`
