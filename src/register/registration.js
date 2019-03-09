import React, {Component} from 'react'
import {View, Text, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native';
import registerStyle from './registerStyle';
import HeaderBar from '../components/headerBar';
import {f, database, auth} from '../../config/config';

class Registration extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }

    leftPress = () =>{
        const {goBack} = this.props.navigation;
        goBack();
    }

    firstNameChange = (firstName) => {
        this.setState ({
            firstName
        })
    }

    lastNameChange = (lastName) => {
        this.setState ({
            lastName
        })
    }

    emailChange = (email) => {
        this.setState ({
            email
        })
    }

    passwordChange = (password) => {
        this.setState ({
            password
        })
    }

    registerUser = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=>this.props.navigation.navigate('Home'))
        .then((userObj) => console.log(email, password, userObj))
        .catch((error) => console.log('error', error));
    }; 
    

    render(){

        const {firstName, lastName, email, password} = this.state;
        return (
            <View style={registerStyle.mainContainer}>
                <HeaderBar 
                    title='Register' 
                    hasLeftIcon
                    onPressLeft={this.leftPress}
                />
                <View style={registerStyle.topContainer}>
                    {/* <View style={registerStyle.nameSection}>
                        <TextInput 
                            style={registerStyle.smallTextInput}
                            placeholder='First Name'
                            underlineColorAndroid='transparent'
                            value={firstName}
                            onChangeText = {this.firstNameChange}    
                        />
                        <TextInput 
                            style={registerStyle.smallTextInput}
                            placeholder='Last Name'
                            underlineColorAndroid='transparent'
                            value={lastName}
                            onChangeText = {this.lastNameChange}    
                        />
                    </View> */}
                    <TextInput 
                        style={registerStyle.largeTextInput}
                        placeholder='Email Address'
                        underlineColorAndroid='transparent'  
                        value={email}
                        onChangeText = {this.emailChange}      
                    />
                    <TextInput 
                        style={registerStyle.largeTextInput}
                        placeholder='Password'
                        secureTextEntry
                        underlineColorAndroid='transparent'  
                        value={password}
                        onChangeText = {this.passwordChange}      
                    />
                </View>
                <View style={registerStyle.bottomContainer}>
                    <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={()=>this.props.navigation.navigate('App')}
                    >
                        <Text style={registerStyle.buttonText}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={()=>this.registerUser(this.state.email, this.state.password)}
                    >
                        <Text style={registerStyle.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Registration