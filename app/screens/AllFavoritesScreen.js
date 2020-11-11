import React, {useState}from 'react';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector } from 'react-redux';

const AllFavoritesScreen = ({navigation}) => {
    const [searchFilterItems, setSearchFilterItems] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const itemData = useSelector(state => state.items.sort())
    const alphabetizeItems = itemData.sort(function(a,b){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
    })


    const renderItem = ({item}) => {
        return(
            <StyledTouchableOpacity onPress={() => navigation.push('FavoriteShowScreen', item)}>
                <StyledText>{item.title.toUpperCase()}</StyledText>
            </StyledTouchableOpacity>
        )
    }

    const renderFilter = (text => {
        setSearchTerm(text)
        let filteredItems = itemData.filter( item => item.title.toLowerCase().includes(text.toLowerCase()))
        setSearchFilterItems(filteredItems)
    })
    
    return(
       <StyledView>
           <SearchBar>
                <MaterialCommunityIcons style={{position: 'absolute', alignItems: 'center', top: 10, zIndex:1, top:5, marginLeft:5}} name="magnify" color='#fff' size={26} />
                <StyledInput
                        placeholder="Search By Item Description"
                        placeholderTextColor="#fff"
                        value={searchTerm}
                        onChangeText={text => renderFilter(text)}
                />
           </SearchBar>
           <StyledFlatList
            data={searchFilterItems !== "" || searchFilterItems.length >= 1 ? searchFilterItems : alphabetizeItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            />
        </StyledView>
    )
}

export default AllFavoritesScreen;

const SearchBar = styled.View`
    flex: 1;
    flex-direction: row;
`

const StyledTouchableOpacity = styled.TouchableOpacity`
    border-bottom-width: .5px;
    border-bottom-color: lightgrey;
`

const StyledText = styled.Text`
    font-family: Raleway_500Medium;
    font-size: 16px;
    margin-top: 12px;
    letter-spacing: 2px;
    margin-bottom: 12px;
    color: #222;
`

const StyledView = styled.View`
    margin: 30px;
` 

const StyledFlatList = styled.FlatList`
    margin-top: 55px;
`

const StyledInput = styled.TextInput`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    border-radius: 10px;
    width: 315px;
    height: 40px;
    background-color: #222;
    font-size: 14px;
    letter-spacing: 2px;
    font-family: Raleway_500Medium;
    color: #fff;
`
