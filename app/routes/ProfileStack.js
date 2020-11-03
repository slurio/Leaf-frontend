import React from 'react';
import styled from 'styled-components/native';
import { Text, Component } from 'react-native';

import { PieChart } from 'react-native-svg-charts'
import { VictoryPie } from "victory-native";

const Profile = (props) => {

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

    return(
       <StyledView>
           <Text>Your Profile!</Text>

           <PieChart style={{ height: 200 }} data={pieData} />

           <VictoryPie
            data={[
                { x: "Cats", y: 35 },
                { x: "Dogs", y: 40 },
                { x: "Birds", y: 55 }
            ]}
            colorScale="qualitative"
            height={400}
            style={{labels:{fontSize: 10}}}
        />

       </StyledView>
    )
}

export default Profile

const StyledView = styled.View`

` 