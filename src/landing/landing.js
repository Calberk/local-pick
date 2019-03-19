import React, {Component} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './landingStyles'
import hotSpot from "../../assets/fireMap.png";  
import {Entypo} from '@expo/vector-icons';
import {f, database, auth} from '../../config/config';
import background from '../../assets/backdrop.jpg';

class Landing extends Component {
    constructor (props){
        super(props);
        this.state = {
            loggedin: false,
            fbLogin: false
        };
    }

    componentDidMount = () =>{
        const that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.setState({
                    loggedin: true
                });
                console.log('fb user info', user)
            }else {
                that.setState({
                    loggedin: false
                });
            }
        })
    }
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
                <ImageBackground
                    resizeMode={'cover'}
                    style={{flex:1}}
                    source={background}
                >
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
                        <Entypo 
                            name='facebook' 
                            size={26} 
                            color="#fff"
                            style={styles.fbIcon}
                        />
                            <Text style = {styles.fbText}>Sign in with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.signInButton}
                        onPress={()=>this.props.navigation.navigate('Login', {})}
                        >
                        <Entypo 
                            name='mail' 
                            size={28} 
                            color="#fff"
                            style={styles.fbIcon}
                        />
                            <Text style = {styles.signInText}>Sign in with email</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpContainer}>
                        <Text style={{color: '#fff'}}>Don't have an account? </Text>
                        <TouchableOpacity 
                            style={styles.registerButton}
                            onPress={()=>this.props.navigation.navigate('Registration', {})}
                            >
                            <Text style = {styles.registerText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                </ImageBackground>
            </View>
        );
    }
}

export default Landing;