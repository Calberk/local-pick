import React, {Component} from 'react'
import {View, Text, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native';
import registerStyle from './registerStyle';
import HeaderBar from '../components/headerBar';

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

    handleSubmit = () => {
        alert('hello ' +this.state.firstName + " " + this.state.lastName + this.state.email +' password ' + this.state.password)
    }
    

    render(){

        const {firstName, lastName, email, password} = this.state;
        return (
            <View style={registerStyle.mainContainer}>
                <HeaderBar 
                    title='Register' 
                    leftPress={this.leftPress}
                />
                <View style={registerStyle.topContainer}>
                    <View style={registerStyle.nameSection}>
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
                    </View>
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
                        onPress={this.handleSubmit}
                    >
                        <Text style={registerStyle.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Registration