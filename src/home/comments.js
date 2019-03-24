import React, {Component} from 'react';
import { Permissions, ImagePicker } from 'expo';
import {View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ToastAndroid, Linking, KeyboardAvoidingView} from 'react-native';
import styles from './commentStyle';
import HeaderBar from '../components/headerBar';
import {FontAwesome, MaterialCommunityIcons, Entypo, Ionicons} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';
import CommentList from '../userList/commentList';


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
            newComment:'',
            comments: [],
            commentId: this.uniqueId(),
        };
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
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
                (console.log('state', params.hotSpotId))
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

    getAvatar = () => {
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

    addComment = () => {
        let user = this.state.userId;
        let comment = this.state.newComment;
        let dateTime = Date.now();
        let timeStamp = Math.floor(dateTime/1000);
        let commentId = this.state.commentId
        let hotSpotId = this.state.hotSpotId

        let commentObj ={
            user,
            comment,
            timeStamp
        }

        if(comment !== ''){
            database.ref('/comments/' + hotSpotId +'/'+ commentId).set(commentObj)
            ToastAndroid.showWithGravity(
                'Comment added!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

        this.setState({
            newComment: '',
        });
        
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
                <View style={{flex:2}}>

                    
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
                            </View>
                        </ImageBackground>
                    </View>

                    <CommentList isUser={true} hotSpotId={this.state.hotSpotId} userId={this.state.userId} navigation={this.props.navigation}/>

                    <KeyboardAvoidingView
                        behavior='padding' enabled style={{borderTopWidth: 3, borderTopColor: 'black', position: 'absolute', bottom: 0}}
                    > 
                        <View style={styles.commentSubmit}>
                            <Text style={{fontWeight:'bold'}}>Post Comment</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput
                                    placeholder={'Enter your comments here'}
                                    value={this.state.newComment}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text)=>this.setState({newComment: text })}
                                    style={styles.largeTextInput}
                                />

                                <TouchableOpacity
                                    style={{marginVertical: 10, height: 50, backgroundColor: 'blue', right: 0, position:'absolute'}}
                                    onPress={()=>this.addComment()}
                                >
                                    <Text>Post</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                        
                </View>
                    
                )}
                    
                    
            </View>   
        );
    }

}

export default Comments