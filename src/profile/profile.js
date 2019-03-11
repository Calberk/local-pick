import React, {Component} from 'react';
import { ImagePicker } from 'expo';
import {View, Text, Button, Image } from 'react-native';
import styleProfile from './styleProfile';
import HeaderBar from '../components/headerBar';
import {f, database, auth} from '../../config/config';

class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null,
            loggedin: false,
            username: '',
            name: '',
            avatar: '',
            userId: '',
            location: '',
        };
    }
    

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.getUserData(user.uid)
            }else {
                that.setState({
                    loggedin: false
                });
            }
        });
    }

    getUserData = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.value();
            that.setState({
                username: data.username,
                name: data.name,
                avatar: data.avatar,
                loggedin: true,
                userId: userId,
                location: data.location
            })
        })
    }


    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        });
    
        // console.log(result);
    
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    signUserOut = () => {
        auth.signOut()
        .then(()=>this.props.navigation.navigate('Auth'))
        .catch((error)=> {
            console.log('error', error);
        });
    }

    render() {
        let { image } = this.state;
    
        return (
            <View>
                {this.state.loggedin === true ? (
                    <View>
                        <HeaderBar title="Profile"/>
                        <View style={{flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Button
                                title="Pick an image from camera roll"
                                onPress={this._pickImage}
                            />
                            {image &&
                            <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
                            <Button
                                title="Log out to landing"
                                onPress={()=>this.signUserOut()}
                            />
                        </View>
                    </View>
                ):(
                    <View>
                        <Text>You are not logged in</Text>
                        <Text>Please login to view your profile</Text>
                    </View>
                    
                )}     
            </View>   
        );
    }

}

export default ProfileScreen