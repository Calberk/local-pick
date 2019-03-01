import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import headerBarStyle from './headerBarStyle';
import {Ionicons} from '@expo/vector-icons';

const HeaderBar = (props)=> 
    (
    <View style={headerBarStyle.topBar}>
        <TouchableOpacity onPress={props.leftPress} style={headerBarStyle.headerIcon}>
            <Ionicons name ="ios-arrow-back" size={32} color="#fff"/>
        </TouchableOpacity>
        <Text style={headerBarStyle.navBarText} > {props.title} </Text>
        <TouchableOpacity >
            <Ionicons name ="ios-arrow-back" size={32} color="black"/>
        </TouchableOpacity>
    </View>
);

export default HeaderBar;