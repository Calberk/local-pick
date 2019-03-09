import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
// import { Input } from 'react-native-elements';
import styles from '../landing/landingStyles';

import InputComponent from '../components/inputs';
import ValidationRules from '../components/validationRules';

class LoginForm extends Component {
    state={
        hasErrors: false,
        form:{
            email: {
                value:"",
                valid: false,
                type: 'textinput',
                rules:{
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value:"",
                valid: false,
                type: 'textinput',
                rules:{
                    isRequired: true,
                    minLength: 6,
                    maxLength: 30
                }
            },
        }
    }


    updateInput = (name, value) =>{
        this.setState({
            hasErrors: false
        });

        let formCopy = this.state.form;
        formCopy[name].value = value;

        let rules = formCopy[name].rules
        let valid = ValidationRules(value, rules);

        forCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    }

    render(){
        return(
            <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
                <InputComponent
                    placeholder="Email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={ value => this.updateInput("email", value) }
                    autoCapitalize = {'none'}
                    keyboardType={'email-address'}
                />
                <InputComponent
                    placeholder="Password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={ value => this.updateInput("password", value)}
                    secureTextEntry
                />

                <View>
                    <TouchableOpacity
                        title="Login"
                        style={styles.signInButton}
                        color="black"
                        onPress={()=> alert('action')}
                    >
                        <Text style = {styles.signInText}>Sign In</Text>
                    </TouchableOpacity>

                    <Button
                        title="Register"
                        color="black"
                        onPress={()=>this.props.navigation.navigate('Registration', {})}
                    />
                </View>
            </View>
        )
    }
}

export default LoginForm