import React, {Component} from 'react';
import {View, Text } from 'react-native';

class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Favorites'
    };

    render() {
        return (
            <View style={styleHome.container}>
                <Text style={styleHome.textBox}>Profile</Text>
            </View>
        )
    }
}

export default ProfileScreen