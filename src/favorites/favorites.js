import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleFavorites from './styleFavorites';
import NavBarDown from '../components/headerBar';
import {SearchBar} from 'react-native-elements';

class FavoriteScreen extends Component {
    state = {
        search: '',
    }

    updateSearch = search => {
        this.setState({search})
    }

    render() {

        const {search} = this.state;

        return (
            <View style={styleFavorites.mainContainer}>
            <NavBarDown
                
                title='WhereAbouts'
            />
            <SearchBar
                platform = 'android'
                placeholder='Search a favorite'
                onChangeText={this.updateSearch}
                value={search}
            />
                <View style={styleFavorites.textContainer}>
                    <Text style={styleFavorites.textBox}>Favorites</Text>
                </View>
            </View>
        )
    }
}

export default FavoriteScreen