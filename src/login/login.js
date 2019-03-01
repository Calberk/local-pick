import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';
import HeaderBar from '../components/headerBar';
import registerStyle from '../register/registerStyle';

class Login extends Component {

        state = {
            email: '',
            password: '',
        }
    
    

    leftPress = () =>{
        const {goBack} = this.props.navigation;
        goBack();
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
        alert('hello ' + this.state.email +' password ' + this.state.password)
    }

    render(){

        const {email, password} = this.state
        return (
            <View>
                <View style={registerStyle.mainContainer}>
                <HeaderBar 
                    title='Login' 
                    hasLeftIcon
                    onPressLeft={this.leftPress}
                />
                <View style={registerStyle.loginContainer}>
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
                        <Text style={registerStyle.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={this.handleSubmit}
                    >
                        <Text style={registerStyle.buttonText}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </View>
        )
    }
}

export default Login