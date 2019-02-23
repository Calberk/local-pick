import React, {Component} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import styles from './landingStyles'
import hotSpot from "../../assets/hotSpot.png";  


class Landing extends Component {

    // handleLogin =() =>{
    //     const {navigate} = this.props.navigation;
    //     navigate('Login');
    // }

    // handleRegister = () => {
    //     const {navigate} = this.props.navigation;
    //     navigate('Registartion');
    // }

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
                        source={hotSpot}
                        />
                </View>
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitleText}>What's Your Hot Spot</Text>
                </View>   
                <View style = {styles.buttonView}>
                    <TouchableOpacity 
                        style={styles.signInButton}
                        onPress={()=>this.props.navigation.navigate('Login', {})}
                        >
                            <Text style = {styles.signInText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.registerButton}
                        onPress={()=>this.props.navigation.navigate('Registration', {})}
                        >
                        <Text style = {styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Landing;