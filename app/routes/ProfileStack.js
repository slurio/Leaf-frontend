import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Profile = (props) => {

    return(
       <StyledView>
           <Text>Your Profile!</Text>
       </StyledView>
    )
}

export default Profile

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
` 