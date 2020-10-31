import React, {useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import { Text } from 'react-native'

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
        <StyledView>
            <Greeting>Welcome {username}!</Greeting>
            <StyledText>Did you know...</StyledText>
            <Fact>{randomFact}</Fact>
         </StyledView>
    )
}

export default Home;

const StyledView = styled.View`
    flex: 1;
    align-items: center;
`

const StyledText = styled.Text`
    top: 150px;
`

const Greeting = styled.Text`
    top: 120px;
    font-weight: bold;
    font-size: 45px;
`

const Fact = styled.Text`
    top: 200px;
    font-weight: bold;
    font-size: 28px;
`
