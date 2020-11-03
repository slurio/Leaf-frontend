import React, {useState}from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const AllFavoritesScreen = ({navigation}) => {
    const itemData = useSelector(state => state.items)

    const [searchFilterItems, setSearchFilterItems] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const renderItem = ({item}) => {
        return(
            <StyledTouchableOpacity onPress={() => navigation.push('FavoriteShowScreen', item)}>
                <StyledText>{item.title}</StyledText>
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
           <StyledTitle>Your Closet</StyledTitle>
           <SearchBar>
                <MaterialCommunityIcons style={{position: 'absolute', alignItems: 'center', top: 10, zIndex:1, top:5, marginLeft:5}} name="magnify" color='#fff' size={26} />
                <StyledInput
                        placeholder="Clothing Description"
                        placeholderTextColor="white"
                        value={searchTerm}
                        onChangeText={text => renderFilter(text)}
                />
           </SearchBar>
           <StyledFlatList
            data={searchFilterItems !== "" || searchFilterItems.length >= 1 ? searchFilterItems : itemData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            />
       </StyledView>
    )
}

export default AllFavoritesScreen;

const SearchBar = styled.View`
    margin-top: 15px;
    flex: 1;
    flex-direction: row;
    color: #3C413D;
`
const StyledTouchableOpacity = styled.TouchableOpacity`
    border-bottom-width: .5px;
    border-bottom-color: lightgrey;
`

const StyledText = styled.Text`
    font-family: Raleway_400Regular;
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
`

const StyledView = styled.View`
    margin: 30px;
` 

const StyledTitle = styled.Text`
    font-size: 22px;
    font-family: Raleway_300Light;
`

const StyledFlatList = styled.FlatList`
    margin-top: 50px;
`

const StyledInput = styled.TextInput`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    border-radius: 10px;
    width: 300px;
    height: 35px;
    background-color: lightgrey;
    font-size: 18px;
    font-family: Raleway_300Light;
`
