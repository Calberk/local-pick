import React, {Component} from 'react';
import {Modal,Text, View, TextInput, TouchableOpacity} from 'react-native';
import registerStyle from './styleProfile';

class ProfileModal extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Modal>
                <View style={registerStyle.topContainer}>
                    <TextInput 
                        underlineColorAndroid="transparent"
                        style={registerStyle.largeTextInput}
                        placeholder='Name'
                        value={this.props.name}
                        onChangeText = {this.nameChange}    
                    />
                    <TextInput 
                        underlineColorAndroid="transparent"
                        style={registerStyle.largeTextInput}
                        placeholder='Username'
                        value={this.props.username}
                        onChangeText = {this.userNameChange}    
                    />
                    <TextInput 
                        underlineColorAndroid="transparent"
                        style={registerStyle.largeTextInput}
                        placeholder='Location'
                        value={this.props.location}
                        onChangeText = {this.locationChange}      
                    />
                </View>
                <TouchableOpacity 
                        style={registerStyle.button}
                        onPress={this.props.handleUpdate}
                    >
                        <Text style={registerStyle.buttonText}>Update</Text>
                    </TouchableOpacity>
            </Modal>
        )
    }
}

export default ProfileModal