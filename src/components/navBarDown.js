import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import navBarDownStyle from './navBarDownStyle';
import {Ionicons} from '@expo/vector-icons';

const NavBarDown = (props)=> 
    (
    <View style={navBarDownStyle.topBar}>
        <TouchableOpacity onPress={props.leftPress} style={navBarDownStyle.headerIcon}>
            <Ionicons name ="ios-arrow-back" size={32} color="#fff"/>
        </TouchableOpacity>
        <Text style={navBarDownStyle.navBarText} > {props.title} </Text>
        <TouchableOpacity >
            <Ionicons name ="ios-arrow-back" size={32} color="black"/>
        </TouchableOpacity>
    </View>
);

export default NavBarDown;