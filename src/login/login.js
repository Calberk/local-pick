import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';
import HeaderBar from '../components/headerBar';
import registerStyle from '../register/registerStyle';
import {f, database, auth} from '../../config/config';


class Login extends Component {
    constructor (props){
        super(props);
        this.state = {
            email: '',
            password: '',
            // loggedin: false,


        }
        f.auth().onAuthStateChanged(function(user){
            if(user){
                // this.setState({
                //     loggedin: true
                // })
                console.log('user logged in', user)
            }else {
                //logged out
                console.log('user logged out')
            }
        })
    }

    loginUser = async(email, password) => {
        if(email != '' && pass != ''){
            try{
                let user = await auth.signInWithAndPassword(email, password)
                console.log(user);
            } catch(error){
                console.log(error)
            }
        }else{
            alert('Missing email or password')
        }
    }
    
    async fbLogin () {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
        '291639681529667',
        {permissions: ['email','public_profile']}
        );
    
        if(type === 'success'){
        const credentials = f.auth.FacebookAuthProvider.credential(token);
        f.auth().signInAndRetrieveDataWithCredential(credentials).catch((error)=> {
            console.log('error', error)
        })
        }else{
            console.log('Error logging in')
        }
    }
    
    registerUser = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((userObj) => console.log(email, password, userObj))
        .catch((error) => console.log('error', error));
    }; 
    
    signUserOut = () => {
        auth.signOut()
        .then(()=> {
            console.log('logged out');
        }).catch((error)=> {
            console.log('error', error);
        });
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
                        onPress={()=> this.props.navigation.navigate('App')}
                    >
                        <Text style={registerStyle.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={()=> this.fbLogin()}
                    >
                        <Text style={registerStyle.buttonText}>FB Login</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </View>
        )
    }
}

export default Login
