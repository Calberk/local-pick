import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import registerStyle from './registerStyle';
import HeaderBar from '../components/headerBar';
import {f, database, auth} from '../../config/config';
import background from '../../assets/backdrop.jpg';
import RegistrationForm from './registrationForm';

class Registration extends Component {
    // state = {
    //     name: '',
    //     username:'',
    //     location:'',
    //     email: '',
    //     password: '',
    // }
    
    // changeText = (type, value) => {
    //     this.setState({[type]: value})
    // }

    // createUserObj =(userObj, email)=> {
    //     var name = this.state.name;
    //     var username = this.state.username
    //     var location = this.state.location
    
    //     var uObj ={
    //         name: name,
    //         username: username,
    //         avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png',
    //         email: email,
    //         location: location
    //     };
    //     database.ref('users').child(userObj.uid).set(uObj);
    // }

    registerUser = async(email, password, name, location, username) => {

        const uObj = {
            name,
            username,
            avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png',
            email,
            location
        }

        // var email = this.state.email;
        // var password = this.state.password;
        if(email !=='' && password !==''){
            try{
                let user = await auth.createUserWithEmailAndPassword(email, password)
                // .then((userObj) => this.createUserObj(userObj.user, email))
                .then((userObj)=> database.ref('users').child(userObj.user.uid).set(uObj))
                .then(()=>this.props.navigation.navigate('Profile'))
                .catch((error)=> alert(error))
        }catch(error){
            console.log(error)
        }

        }; 
    }
    

    render(){

        return (

            <RegistrationForm registration={this.registerUser}/>


            // <View style={registerStyle.mainContainer}>
            //     <HeaderBar 
            //         title='Registration' 
            //         hasLeftIcon
            //         onPressLeft={()=> this.props.navigation.goBack()}
            //     />
            //     <ImageBackground
            //         resizeMode={'cover'}
            //         style={{flex:1}}
            //         source={background}
            //     >
            //     <KeyboardAvoidingView
            //         style={registerStyle.topRegisterContainer}
            //         behavior="padding"
            //     >
            //     <View style={registerStyle.topRegisterContainer}>
            //         <TextInput 
            //             underlineColorAndroid="transparent"
            //             style={registerStyle.largeTextInput}
            //             placeholder='Name'
            //             value={this.props.name}
            //             onChangeText = {value => this.changeText('name', value)}    
            //         />
            //         <TextInput 
            //             underlineColorAndroid="transparent"
            //             style={registerStyle.largeTextInput}
            //             placeholder='Username'
            //             value={this.props.username}
            //             onChangeText = {value => this.changeText('username', value)}    
            //         />
            //         <TextInput 
            //             underlineColorAndroid="transparent"
            //             style={registerStyle.largeTextInput}
            //             placeholder='Location'
            //             value={this.props.location}
            //             onChangeText = {value => this.changeText('location', value)}     
            //         />
            //         <TextInput 
            //             underlineColorAndroid="transparent"
            //             style={registerStyle.largeTextInput}
            //             placeholder='Email Address'
            //             value={this.props.email}
            //             onChangeText = {value => this.changeText('email', value)}       
            //         />
            //         <TextInput 
            //             underlineColorAndroid="transparent"
            //             style={registerStyle.largeTextInput}
            //             placeholder='Password'
            //             secureTextEntry
            //             value={this.props.password}
            //             onChangeText = {value => this.changeText('password', value)}       
            //         />
            //     </View>
            //     </KeyboardAvoidingView>
            //     <View style={registerStyle.bottomRegisterContainer}>
            //         <TouchableOpacity 
            //             style={registerStyle.button}
            //             onPress={()=>this.registerUser()}
            //         >
            //             <Text style={registerStyle.buttonText}>Register</Text>
            //         </TouchableOpacity>
            //     </View>
            //     </ImageBackground>
            // </View>
        );
    }
}

export default Registration