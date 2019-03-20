import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import headerBarStyle from './headerBarStyle';
import {Ionicons} from '@expo/vector-icons';
import {Icon} from 'react-native-elements';

// const HeaderBar = ({props})=> 
//     (
//     <View style={headerBarStyle.topBar}>
//         <TouchableOpacity onPress={props.leftPress} style={headerBarStyle.headerIcon}>
//             <Ionicons name ="ios-arrow-back" size={32} color="#fff"/>
//         </TouchableOpacity>
//         <Text style={headerBarStyle.navBarText} > {props.title} </Text>
//         <TouchableOpacity >
//             <Ionicons name ="ios-arrow-back" size={32} color="black"/>
//         </TouchableOpacity>
//     </View>
// );

const HeaderBar = ({title, rightIcon, hasLeftIcon, hasRightIcon, onPressLeft, onPressRight, type, size})=> 
    (
        <View style={headerBarStyle.navBarContainer}>
            {hasLeftIcon ?
                <TouchableOpacity onPress={onPressLeft}>
                    <Icon style={headerBarStyle.leftIcon} type='ionicon' name="ios-arrow-back" size={40} color="#fff" iconStyle={{paddingLeft:10}}/>
                </TouchableOpacity>    
            :
            <Icon style={headerBarStyle.leftIcon} size={25} />
            }
            <Text style={headerBarStyle.navTitle}> {title} </Text>
            {hasRightIcon ?
                <TouchableOpacity onPress={onPressRight}>
                    <Icon style={headerBarStyle.rightIcon} type={type} name={rightIcon} size={size} color="#fff" iconStyle={{paddingRight:5}}/>
                </TouchableOpacity>    
            :
            <Icon style={headerBarStyle.rightIcon} size={25} />
            }
        </View>
    )

export default HeaderBar;