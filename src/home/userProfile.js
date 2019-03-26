import React, {Component} from 'react';
import {View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ToastAndroid} from 'react-native';
import styles from '../profile/styleProfile';
import HeaderBar from '../components/headerBar';
import {FontAwesome, MaterialCommunityIcons, Entypo, Ionicons} from '@expo/vector-icons';
import ProfileList from '../userList/profileList';

import {f, database, auth, storage} from '../../config/config';

class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null,
            loaded: false,
            isVisible: false,
            username: '',
            name: '',
            avatar: '',
            userId: '',
            location: '',
            email: '',
        };
    }
    
    // on load check for user auth and fetch user data
    componentDidMount = () => {
        this.checkParams();
    }

    checkParams =()=> {
        const params = this.props.navigation.state.params;
        if(params){
            if(params.userId){
                this.setState({
                    userId: params.userId
                });
                this.getUserData(params.userId)
            }
        }
    }

    // get all user details that are stored in firebase
    getUserData = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            that.setState({
                username: data.username,
                name: data.name,
                avatar: data.avatar,
                loaded: true,
                location: data.location,
                email: data.email,
                currentImg: data.currentImg
            })
            
        }).catch(error=>console.log(error));
        
    }

    headerComponent = () =>{ 
        return(
            <ImageBackground
                resizeMode={'cover'}
                style={height= '100%'}
                source={{uri:this.state.avatar}}
            >
                <View style={styles.profileInfo}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={{uri: this.state.avatar }}/>
                    </View>  
                    <View style={styles.profileSection}>
                        <View style={styles.userInfo}>
                            <Text style={styles.nameText}>{this.state.name}</Text>
                            <View style={styles.locationContainer}>
                                <Entypo name='location-pin' size={36} color='#cc0000' />
                                <Text style={styles.locationText}>{this.state.location}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </ImageBackground>
        )
        
    }

    render() {
        let { image } = this.state;
    
        return (
            <View style={{flex: 1}}>
                <HeaderBar 
                    raised
                    title={this.state.username}
                    hasLeftIcon
                    onPressLeft={()=> this.props.navigation.goBack()}
                />
                
                {this.state.loaded === false ? (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                ):(
                    <View style={{flex: 2}}>
                        <ProfileList isUser={true} userId={this.state.userId} testComponent={this.headerComponent} navigation={this.props.navigation}/>
                    </View>
                )}
                    
                
            </View>   
        );
    }

}

export default ProfileScreen