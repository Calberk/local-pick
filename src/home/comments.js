import React, {Component} from 'react';
import { Permissions, ImagePicker } from 'expo';
import {View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ToastAndroid, Linking} from 'react-native';
import styles from './commentStyle';
import HeaderBar from '../components/headerBar';
import {FontAwesome, MaterialCommunityIcons, Entypo, Ionicons} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';
import ProfileList from '../userList/profileList';
import background from '../../assets/backdrop.jpg';

import {f, database, auth, storage} from '../../config/config';

class Comments extends Component {
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
            photo: '',
            map: '',
            hotSpotId: '',
            spotName: '',
        };
    }
    
    // on load check for user auth and fetch user data
    componentDidMount = () => {
        this.checkParams();
    }

    checkParams =()=> {
        const params = this.props.navigation.state.params;
        if(params){
            if(params.hotSpotId){
                this.setState({
                    hotSpotId: params.hotSpotId
                });
                this.getUserData(params.hotSpotId)
            }
        }
    }

    // get all user details that are stored in firebase
    getUserData = (hotSpotId) => {
        var that = this;
        database.ref('hotSpots').child(hotSpotId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            that.setState({
                username: data.username,
                avatar: data.avatar,
                loaded: true,
                location: data.location,
                email: data.email,
                currentImg: data.currentImg,
                comment: data.comment,
                spotName: data.name,
                photo: data.photo,
                userId: data.user
            })
            that.getAvatar();
        }).catch(error=>console.log(error));
       
    }

    getAvatar(){
        var that = this
        database.ref('users').child(that.state.userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            console.log(data)
            that.setState({
                avatar: data.avatar
            })
            
        }).catch(error=>console.log(error));
    }

    render() {
        let { image } = this.state;
    
        return (
            <View style={{flex: 1}}>
                <HeaderBar 
                    raised
                    title={this.state.spotName}
                    hasLeftIcon
                    onPressLeft={()=> this.props.navigation.goBack()}
                />
                
                {this.state.loaded === false ? (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                ):(
                    <View style={{height: 200, backgroundColor: 'rgba(243, 241, 239, 1)'}}>
                        <ImageBackground
                            resizeMode={'cover'}
                            style={{height: '100%'}}
                            source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.state.photo}&key=AIzaSyCXZxoa0P09f1o6y3RnGWwZ6m7vSPYEQ-k`}}
                        >
                            <View style={styles.userCommentInfo}>
                                 
                                <View style={styles.comments}>
                                    <Image style={styles.avatar} source={{uri: this.state.avatar }}/>
                                    <View style={styles.commentSection}>
                                        <Text style={styles.userText}>{this.state.username}:  <Text style={styles.commentText}>{this.state.comment}</Text></Text>
                                        
                                    </View>
                                    
                                </View>
                                {/* <View style={styles.commentHeader}>
                                    <TouchableOpacity title='call' onPress={()=> Linking.openURL(this.state.map)} style={{alignItems:'center'}}>
                                        <MaterialCommunityIcons name='map-marker-radius' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                    <Text style={styles.nameText}>{this.state.name}</Text>
                                    <Text style={styles.locationText}>{this.state.location}</Text>
                                </View>  */}
                            </View>
                        </ImageBackground>


                    </View>
                )}
                    
                
            </View>   
        );
    }

}

export default Comments