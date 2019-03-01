import React, {Component} from 'react';
import { ImagePicker } from 'expo';
import {View, Text, Button, Image } from 'react-native';
import styleProfile from './styleProfile';

class ProfileScreen extends Component {

    state = {
        image: null,
      };

    // render() {
    //     return (
    //         <View style={styleProfile.mainContainer}>
    //             <View style={styleProfile.textContainer}>
    //                 <Text style={styleProfile.textBox}>Profile</Text>
    //             </View>
    //         </View>
    //     )
    // }

    render() {
        let { image } = this.state;
    
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
            {image &&
                <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
                <Button
                    title="Log out to landing"
                    onPress={()=>this.props.navigation.navigate('Auth')}
                />
            </View>
        );
    }
    
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

}

export default ProfileScreen