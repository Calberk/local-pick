import React, {Component} from 'react'
import {View, Text, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native';
import registerStyle from './registerStyle';
import NavBarDown from '../components/navBarDown';

class Registration extends Component {

    leftPress = () =>{
        const {goBack} = this.props.navigation;
        goBack();
    }

    render(){
        return (
            <View style={registerStyle.mainContainer}>
                <NavBarDown 
                    title='Register' 
                    leftPress={this.leftPress}
                />
                <View style={registerStyle.topContainer}>
                    <View style={registerStyle.nameSection}>
                        <TextInput 
                            style={registerStyle.smallTextInput}
                            placeholder='First Name'
                            underlineColorAndroid='transparent'
                        />
                        <TextInput 
                            style={registerStyle.smallTextInput}
                            placeholder='Last Name'
                            underlineColorAndroid='transparent'
                        />
                    </View>
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
                    <TouchableOpacity style={registerStyle.button}>
                        <Text style={registerStyle.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Registration