import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleHome from './styleHome';
import HeaderBar from '../components/headerBar'

class HomeScreen extends Component {

    render() {
        return (
            <View style={styleHome.mainContainer}>
                <HeaderBar title="Home"/>
                <View style={styleHome.textContainer}>
                    <Text style={styleHome.textBox}>Home</Text>
                </View>
                
            </View>
        )
    }
}

export default HomeScreen