import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import registerStyle from './registerStyle';
import HeaderBar from '../components/headerBar';
import background from '../../assets/backdrop.jpg';
import input from '../components/inputs';


class Signup extends Component{


    submit = user => {
        const {registration} = this.props;
        registration(user.email, user.password, user.location, user.name, user.username)
    }

    render(){

        const {handleSubmit} = this.props;

        return (
            <View style={registerStyle.mainContainer}>
                <HeaderBar 
                    title='Registration' 
                    hasLeftIcon
                    onPressLeft={()=> this.props.navigation.goBack()}
                />
                <ImageBackground
                    resizeMode={'cover'}
                    style={{flex:1}}
                    source={background}
                >
                <KeyboardAvoidingView
                    style={registerStyle.topRegisterContainer}
                    behavior="padding"
                >
                <View style={registerStyle.topRegisterContainer}>
                    <Field 
                        keyboardType='default' 
                        placeholder='Name'
                        component={input} 
                        name='name'
                        customStyles={registerStyle.largeTextInput}
                    />
                    <Field 
                        keyboardType='default' 
                        placeholder='Username'
                        component={input} 
                        name='username'
                        customStyles={registerStyle.largeTextInput}
                    />
                    <Field 
                        keyboardType='default' 
                        placeholder='Your City'
                        component={input} 
                        name='location'
                        customStyles={registerStyle.largeTextInput}
                    />
                    <Field 
                        keyboardType='email-address' 
                        placeholder='Email'
                        autoCapitalize='none'
                        component={input} 
                        name='email'
                        customStyles={registerStyle.largeTextInput}
                    />
                    <Field 
                        keyboardType='default' 
                        placeholder='Password'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        component={input} 
                        name='password'
                        customStyles={registerStyle.largeTextInput}
                    />
                    <Field 
                        keyboardType='default' 
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        component={input} 
                        name='confirmPassword'
                        customStyles={registerStyle.largeTextInput}
                    />
                </View>
                </KeyboardAvoidingView>
                <View style={registerStyle.bottomRegisterContainer}>
                    <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={handleSubmit(this.submit)}
                    >
                        <Text style={registerStyle.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        );
    }
}

const validate = values => {
    const errors = {};      
    if (!values.name) {
        errors.name = 'Name Required'
    } else if (values.name.length < 2 || values.name.length > 25) {
        errors.firstname = 'Must be between 2 and 25 characters'
    } 

    if (!values.username) {
        errors.username = 'Username Required'
    } else if (values.username.length < 3 || values.username.length > 20) {
        errors.username = 'Must be between 3 and 20 characters'
    }  

    if (!values.email) {
        errors.email = 'Email Required'
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = 'Invalid email format. Example: test@mail.com'
    } 
    
    if (!values.password) {
        errors.password = 'Password Required'
    } else if (values.password.length < 6 || values.password.length > 20) {
        errors.password = 'Must be between 6 and 20 characters'
    }

    if (!values.confirmpassword) {
        errors.confirmpassword = 'Password Confirm Required'
    } else if (values.confirmpassword !== values.password){
        errors.password = 'Passwords does not match!'
        errors.confirmpassword = 'Passwords does not match!'
    }

    return errors
}


const SignupForm = reduxForm({
    form: 'signup',
    validate
})(Signup)

export default SignupForm