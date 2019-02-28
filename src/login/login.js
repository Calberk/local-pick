import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';
import HeaderBar from '../components/headerBar';
import registerStyle from '../register/registerStyle';

class Login extends Component {

    leftPress = () =>{
        const {goBack} = this.props.navigation;
        goBack();
    }

    render(){
        return (
            <View>
                <View style={registerStyle.mainContainer}>
                <HeaderBar 
                    title='Login' 
                    leftPress={this.leftPress}
                />
                <View style={registerStyle.loginContainer}>
                    <TextInput 
                        style={registerStyle.largeTextInput}
                        placeholder='Email Address'
                        underlineColorAndroid='transparent'    
                    />
                    <TextInput 
                        style={registerStyle.largeTextInput}
                        placeholder='Password'
                        secureTextEntry
                        underlineColorAndroid='transparent'    
                    />
                </View>
                <View style={registerStyle.bottomContainer}>
                    <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={()=>this.props.navigation.navigate('App')}
                    >
                        <Text style={registerStyle.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}

export default Login