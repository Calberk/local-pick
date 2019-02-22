import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import navBarDownStyle from './navBarDownStyle';
import {AntDesign} from '@expo/vector-icons';

const NavBarDown = (props)=> 
    (
    <View style={navBarDownStyle.topBar}>
        <TouchableOpacity >
            <AntDesign name ="down" size={32} color="#fff"/>
        </TouchableOpacity>
        <Text style={navBarDownStyle.navBarText} > {props.title} </Text>
        <TouchableOpacity >
            <AntDesign name ="down" size={32} color="black"/>
        </TouchableOpacity>
    </View>
);

export default NavBarDown;