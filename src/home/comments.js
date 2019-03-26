import React, {Component} from 'react';
import { Permissions, ImagePicker } from 'expo';
import {View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ToastAndroid, FlatList, KeyboardAvoidingView, Keyboard} from 'react-native';
import styles from './commentStyle';
import HeaderBar from '../components/headerBar';
import {FontAwesome, MaterialCommunityIcons, Entypo, Ionicons} from '@expo/vector-icons';
import {Overlay} from 'react-native-elements';
import CommentList from '../userList/commentList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


import {f, database, auth, storage} from '../../config/config';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null,
            loaded: false,
            loading: true,
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
                this.getUserData(params.hotSpotId);
                this.loadFeed(params.hotSpotId);
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
            that.setState({
                avatar: data.avatar
            })
            
        }).catch(error=>console.log(error));
    }

    addComment = () => {

    var comment = this.state.newComment;

    if(comment !== ''){
        let user = f.auth().currentUser.uid;
        let dateTime = Date.now();
        let timeStamp = Math.floor(dateTime/1000);
        let commentId = this.uniqueId();
        let hotSpotId = this.state.hotSpotId

        
        this.setState({
            newComment: '',
        });

        let commentObj ={
            user,
            comment,
            timeStamp
        }

        database.ref('/comments/' + hotSpotId +'/'+ commentId).set(commentObj)
        Keyboard.dismiss();
        this.reloadComments();
        ToastAndroid.showWithGravity(
            'Comment added!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

        }else{
            alert('Please enter a comment before posting')
        }
    }

    reloadComments = () => {
        this.setState({
            comments: [],
            loading: true
        });
        this.loadFeed(this.state.hotSpotId);
    }

    loadFeed = (hotSpotId) => {

        // this.setState({
        //     refreshing: true,
        //     comments: []
        // });

        var that = this

        var loadRef = database.ref('comments').child(hotSpotId)
        

        loadRef.orderByChild('timeStamp').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists){
            data = snapshot.val();
            var comments= that.state.comments;  

            for(var comment in data){
                that.addToFlatList(comments, data, comment, hotSpotId);
            }
        }else {

            that.setState({
                comments: [],
                refreshing: false
            })
        } 
        }).catch(error=> console.log(error));
    }

    addToFlatList = (comments, data, comment, hotSpotId)=>{
        var that = this;
        var commentObj = data[comment];
        database.ref('users').child(f.auth().currentUser.uid).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                comments.push({
                    id: comment,
                    comment: commentObj.comment,
                    username: data.username,
                    avatar: data.avatar
                });
                that.setState({
                    refreshing: false,
                    loading: false
                });
        }).catch(error=> console.log(error));
    }

    render() {
    
        return (
            <View style={{flex: 1}}>
                <HeaderBar 
                    raised
                    title='Comments'
                    hasLeftIcon
                    onPressLeft={()=> this.props.navigation.goBack()}
                />
                
                {this.state.loaded === false ? (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                ):(
                <View style={{flex:2}}>

                    
                    <View style={{height: 200, backgroundColor: 'blue'}}>
                        <ImageBackground
                            resizeMode={'cover'}
                            style={{height: '100%'}}
                            source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.state.photo}&key=AIzaSyCXZxoa0P09f1o6y3RnGWwZ6m7vSPYEQ-k`}}
                        >
                            <View style={styles.userCommentInfo}>
                                <View style={styles.commentHeader}>
                                    <Text style={{color: '#cc0000', fontSize: 26, fontFamily: 'openSansBI'}}>{this.state.spotName}</Text>
                                </View>
                                <View style={styles.mainComments}>
                                    <Image style={styles.avatar} source={{uri: this.state.avatar }}/>
                                    <View style={styles.commentSection}>
                                        <Text style={styles.userText}>{this.state.username}: </Text> 
                                        <Text style={styles.commentText}>{this.state.comment}</Text>  
                                        
                                    </View>
                                    
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    {/* <CommentList isUser={true} hotSpotId={this.state.hotSpotId} userId={f.auth().currentUser.uid} navigation={this.props.navigation}/> */}

                    <View style={{flex: 3}} >
                        {this.state.loading === true ? (
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text>Loading...</Text>
                            </View>
                        ): this.state.comments.length === 0 ? (
                            <View style={styles.content}>
                                <Text style={styles.header}>No comments</Text>
                                <Text style={{color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'openSansI'}}>Be the first to comment below</Text>
                            </View>
                        ) : (
                            <FlatList
                            refreshing = {this.state.refreshing}
                            // onRefresh = {this.loadNew}
                            // onEndReached = {this.handleLoad}
                            data = {this.state.comments}
                            keyExtractor = {(item, index)=> index.toString()}
                            style={{flex:1}}
                            renderItem={({item, index}) => (
                                <View key={index} style={{marginTop: 13, marginBottom: 10
                                , alignItems: 'center'}}>
                                    <View style={styles.comments}>
                                        <Image style={styles.subAvatar} source={{uri: item.avatar }}/>
                                        <View style={styles.subCommentSection}>
                                            <Text style={styles.subUserText}>{item.username}:  <Text style={styles.subCommentText}>{item.comment}</Text></Text>
                                        </View>
                                    </View>
                                </View>
                                
                            )}
                            />  
                        )}
                    </View>

                    <KeyboardAvoidingView
                        behavior='padding' keyboardVerticalOffset={100} enabled style={{borderTopWidth: 3, borderTopColor: 'black', bottom: 0}}
                    > 
                        <View style={styles.commentSubmit}>
                            {/* <Text style={{fontWeight:'bold'}}>Post Comment</Text> */}
                            <View style={styles.submitSection}>
                                <TextInput
                                    placeholder={'Enter your comments here'}
                                    value={this.state.newComment}
                                    onChangeText={(value)=>this.setState({newComment: value })}
                                    style={styles.largeTextInput}
                                    underlineColorAndroid="transparent"
                                />

                                <TouchableOpacity
                                    style={styles.postCommentBtn}
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