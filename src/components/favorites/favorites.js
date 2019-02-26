import React, {Component} from 'react';
import {View, Text } from 'react-native';

class FavoriteScreen extends Component {
    static navigationOptions = {
        title: 'Favorites'
    };

    render() {
        return (
            <View style={styleHome.container}>
                <Text style={styleHome.textBox}>Favorites</Text>
            </View>
        )
    }
}

export default FavoriteScreen