import React, {Component} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import styles from './landingStyles'
import hotSpot from "../../assets/hotSpot.png";  
import LoginForm from '../login/loginForm';
import {f, database, auth} from '../../config/config';

class Landing extends Component {
    constructor (props){
        super(props);
    this.state = {
        loggedin: false,
    };

    const that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.setState({
                    loggedin: true
                })
                
            }else {
                that.setState({
                    loggedin: false
                });
                console.log('user logged out')
            }
        })
    }

    // handleLogin =() =>{
    //     const {navigate} = this.props.navigation;
    //     navigate('Login');
    // }

    // handleRegister = () => {
    //     const {navigate} = this.props.navigation;
    //     navigate('Registartion');
    // }

    async fbLogin () {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
        '291639681529667',
        {permissions: ['email','public_profile']}
        );
    
        if(type === 'success'){
        const credentials = f.auth.FacebookAuthProvider.credential(token);
        f.auth().signInAndRetrieveDataWithCredential(credentials)
        .then(()=>this.props.navigation.navigate('Home'))
        .catch((error)=> {
            console.log('error', error)
        })
        }else{
            console.log('Error logging in')
        }
    }

    render () {
        return (
            <View style = {styles.mainContainerView}>
                <StatusBar
                    barStyle = "light-content"
                />
                <View style={styles.logoView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>Hot Spots</Text>
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
                </View> 
                
                <View style={styles.buttonView}>
                    {/* <LoginForm/> */}
                </View> 
                
                <View style = {styles.buttonView}>
                    <TouchableOpacity 
                        style={styles.fbButton}
                        onPress={()=>this.fbLogin()}
                        >
                            <Text style = {styles.fbText}>Sign in with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.signInButton}
                        onPress={()=>this.props.navigation.navigate('Login', {})}
                        >
                            <Text style = {styles.signInText}>Sign in with email</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpContainer}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity 
                            style={styles.registerButton}
                            onPress={()=>this.props.navigation.navigate('Registration', {})}
                            >
                            <Text style = {styles.registerText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
            </View>
        );
    }
}

export default Landing;