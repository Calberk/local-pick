import React, {Component} from 'react'
import {View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import registerStyle from './registerStyle';
import NavBarDown from '../components/navBarDown';

class Registration extends Component {
    render(){
        return (
            <View style={registerStyle.mainContainer}>
                <NavBarDown title='Register' />
            </View>
        );
    }
}

export default Registration