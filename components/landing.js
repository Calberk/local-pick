import React, {Component} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import fireSpot from '../assets/hotSpot.png';  


class Landing extends Component {
    render () {
        return (
            <View style = {styles.mainContainerView}>
                <StatusBar
                    barStyle = "light-content"
                /> 
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>WHEREABOUTS</Text>
                </View>        
                <View style={styles.imageView}>
                    <Image 
                        style={styles.image}
                        resizeMode={'contain'}
                        source={fireSpot}
                        />
                </View>
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitleText}>What's Your Hot Spot</Text>
                </View>   
                <View style = {styles.buttonView}>
                    <TouchableOpacity style={styles.signInButton}>
                        <Text style = {styles.signInText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style = {styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Landing;