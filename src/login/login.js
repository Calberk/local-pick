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
        loggedin: false,
    };

    const that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.setState({
                    loggedin: true
                })
                // console.log('user logged in', user)
            }else {
                that.setState({
                    loggedin: false
                });
                // console.log('user logged out')
            }
        })
    }
        
    

    loginUser = async(email, password) => {
        // console.log(email,password)
        if(email != '' && password != ''){
            try{
                let user = await auth.signInWithEmailAndPassword(email, password)
                .then(()=>this.props.navigation.navigate('Home'))
                console.log(user);
            } catch(error){
                console.log(error)
            }
        }else{
            alert('Missing email or password')
        }
    }
    
    
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

    render(){

        const {email, password} = this.state
        return (
            
            <View style={registerStyle.mainContainer}>
                <HeaderBar 
                    title='Login' 
                    hasLeftIcon
                    onPressLeft={this.leftPress}
                />
                
                    {this.state.loggedin === true ? (
                        <View style={registerStyle.loginContainer}>
                            <Text>You are currently logged in</Text>
                            <TouchableOpacity
                                onPress={()=>this.signUserOut()}
                                style={{backgroundColor: 'red'}}
                            >
                                <Text>Log Out</Text>
                            </TouchableOpacity>                  
                        </View>
                    ) : (
                        <View style={registerStyle.loginContainer}>
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
                                    onPress={()=>this.loginUser(this.state.email, this.state.password)}
                                >
                                    <Text style={registerStyle.buttonText}>Log In</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity 
                                    style={registerStyle.button}
                                    onPress={()=> this.fbLogin()}
                                >
                                    <Text style={registerStyle.buttonText}>FB Login</Text>
                                </TouchableOpacity> */}
                            </View>
                            </View>
                        )}
            </View>
        )
    }
}

export default Login
