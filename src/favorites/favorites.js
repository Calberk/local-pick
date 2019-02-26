import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleFavorites from './styleFavorites';

class FavoriteScreen extends Component {
    static navigationOptions = {
        title: 'Favorites'
    };

    render() {
        return (
            <View style={styleFavorites.container}>
                <Text style={styleFavorites.textBox}>Favorites</Text>
            </View>
        )
    }
}

export default FavoriteScreen