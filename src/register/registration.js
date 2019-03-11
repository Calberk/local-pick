import React, {Component} from 'react'
import {View, Text, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native';
import registerStyle from './registerStyle';
import HeaderBar from '../components/headerBar';
import {f, database, auth} from '../../config/config';

class Registration extends Component {
    state = {
        name: '',
        username:'',
        location:'',
        email: '',
        password: '',
    }
    

    leftPress = () =>{
        const {goBack} = this.props.navigation;
        goBack();
    }

    nameChange = (name) => {
        this.setState ({
            name
        })
    }

    userNameChange = (username) => {
        this.setState ({
            username
        })
    }

    locationChange = (location) => {
        this.setState ({
            location
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

    createUserObj =(userObj, email)=> {
        var name = this.state.name;
        var username = this.state.username
        console.log('userobj'+userObj, email, userObj.uid)
        var uObj ={
            name: name,
            username: username,
            avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png',
            email: email
        };
        database.ref('users').child(userObj.uid).set(uObj);
    }

    registerUser = async(email, password) => {
        var email = this.state.email;
        var password = this.state.password;
        if(email !=='' && password !==''){
            try{
                let user = await auth.createUserWithEmailAndPassword(email, password)
                .then((userObj) => this.createUserObj(userObj.user, email))
                .then(()=>this.props.navigation.navigate('Home'))
                .catch((error)=> alert(error))
        }catch(error){
            console.log(error)
        }

        }; 
    }
    

    render(){

        const {name, username, email, password, location} = this.state;
        return (
            <View style={registerStyle.mainContainer}>
                <HeaderBar 
                    title='Register' 
                    hasLeftIcon
                    onPressLeft={this.leftPress}
                />
                <View style={registerStyle.topContainer}>
                        <TextInput 
                            style={registerStyle.largeTextInput}
                            placeholder='Name'
                            underlineColorAndroid='transparent'
                            value={name}
                            onChangeText = {this.nameChange}    
                        />
                        <TextInput 
                            style={registerStyle.largeTextInput}
                            placeholder='Username'
                            underlineColorAndroid='transparent'
                            value={username}
                            onChangeText = {this.userNameChange}    
                        />
                    <TextInput 
                        style={registerStyle.largeTextInput}
                        placeholder='Location'
                        underlineColorAndroid='transparent'  
                        value={location}
                        onChangeText = {this.locationChange}      
                    />
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
                    {/* <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={()=>this.props.navigation.navigate('App')}
                    >
                        <Text style={registerStyle.buttonText}>Confirm</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={()=>this.registerUser()}
                    >
                        <Text style={registerStyle.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Registration