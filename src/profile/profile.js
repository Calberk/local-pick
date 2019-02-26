import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleProfile from './styleProfile';

class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile'
    };

    render() {
        return (
            <View style={styleProfile.container}>
                <Text style={styleProfile.textBox}>Profile</Text>
            </View>
        )
    }
}

export default ProfileScreen