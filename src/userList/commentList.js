import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {f, auth, database, storage} from '../../config/config';
import styles from '../home/commentStyle'


class CommentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            refreshing: false,
            loading: true
        }
    }

    componentDidMount =()=>{
        const {isUser, hotSpotId, userId} = this.props;

        if(isUser === true){
            this.loadFeed(hotSpotId, userId)
        }else{
            this.loadFeed('');
        }
    }

    loadFeed = (hotSpotId, userId) => {
        this.setState({
            refreshing: true,
            comments: []
        });

        var that = this

        var loadRef = database.ref('comments').child(hotSpotId)
        

        loadRef.orderByChild('timeStamp').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        console.log('1st exists', exists)
        if(exists){
            data = snapshot.val();
            console.log('comments data', data)
            var comments= that.state.comments;  

            for(var comment in data){
                that.addToFlatList(comments, data, comment, hotSpotId, userId);
            }
        }else {

            that.setState({
                comments: [],
                loading: false,
                refreshing: false
            })
        } 
        }).catch(error=> console.log(error));
    }

    addToFlatList = (comments, data, comment, hotSpotId, userId)=>{
        var that = this;
        var commentObj = data[comment];
        database.ref('users').child(userId).once('value').then(function(snapshot){
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

    loadNew = () => {
        this.loadFeed();
    }

    handleLoad =() => {
        console.log('end')
    }
    
    render(){
        return(
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
                    onRefresh = {this.loadNew}
                    onEndReached = {this.handleLoad}
                    data = {this.state.comments}
                    keyExtractor = {(item, index)=> index.toString()}
                    style={{flex:1}}
                    renderItem={({item, index}) => (
                        <View key={index} style={{marginTop: 15}}>
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
        )
    }
}

export default CommentList