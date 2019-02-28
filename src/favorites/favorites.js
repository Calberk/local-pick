import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleFavorites from './styleFavorites';
import NavBarDown from '../components/headerBar';

class FavoriteScreen extends Component {

    render() {
        return (
            <View style={styleFavorites.mainContainer}>
            <NavBarDown
                
                title='WhereAbouts'
            />
                <View style={styleFavorites.textContainer}>
                    <Text style={styleFavorites.textBox}>Favorites</Text>
                </View>
            </View>
        )
    }
}

export default FavoriteScreen