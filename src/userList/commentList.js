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
            console.log('comment section load', hotSpotId, userId)
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
        

        loadRef.orderByChild('timestamp').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
            var comments= that.state.comments;  

            for(var comment in data){
                that.addToFlatList(comments, data, comment, hotSpotId, userId);
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
                    username: commentObj.username,
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
                ): (
                <FlatList
                refreshing = {this.state.refreshing}
                // onRefresh = {this.loadNew}
                onEndReached = {this.handleLoad}
                data = {this.state.spots}
                keyExtractor = {(item, index)=> index.toString()}
                renderItem={({item, index}) => (
                    <View key={index} style={styles.userCommentInfo}>
                        <View style={styles.comments}>
                            <Image style={styles.avatar} source={{uri: item.avatar }}/>
                            <View style={styles.commentSection}>
                                <Text style={styles.userText}>{item.username}:  <Text style={styles.commentText}>{item.comment}</Text></Text>
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