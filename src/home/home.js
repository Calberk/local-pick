import React, {Component} from 'react';
import {View, Text, FlatList, Image } from 'react-native';
import styleHome from './styleHome';
import HeaderBar from '../components/headerBar'
import {Icon} from 'react-native-elements';
import {f, auth, database, storage} from '../../config/config'

class HomeScreen extends Component {
    state = {
        photo_feed: [],
        refreshing: false,
        loading: true
    }
    
    componentDidMount = () => {
        this.loadFeed();
    }

    loadFeed =() => {
        this.setState({
            refreshing: true,
            photo_feed: []
        });

        database.ref('hotspots').orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                var photo_feed= this.state.photo_feed;  

                for(var hSpot in data){
                    var hotSpotObj = data[hSpot];
                    database.ref('users').orderByChild('hotSpotObj.author').once('value').then(function(snapshot){
                        const exists = (snapshot.val() !==null);
                        if(exists) data = snapshot.val();    
                            photo_feed.push({
                                id: hSpot,
                                url: hotSpotObj.url, 
                                title: hotSpotObj.title,
                                posted: hotSpotObj.posted,
                                author: data.username
                            });

                            this.setState({
                                refreshing: false,
                                loading: false
                            });
                    }).catch(error=> console.log('error', error));
                }    
        }).catch(error=> console.log('error', error));
    }

    loadNew =() => {
        this.setState({
            refreshing: true
        });
        this.setState({
            photo_feed: [5,6,7,8,9],
            refreshing: false
        });
    }

    render() {
        return (
            <View style={styleHome.mainContainer}>
                <HeaderBar 
                    title='Home'
                    hasRightIcon
                    type='ionicon'
                    rightIcon='md-add'
                    
                />
                <FlatList
                    refreshing = {this.state.refreshing}
                    onRefresh = {this.loadNew}
                    data = {this.state.photo_feed}
                    keyExtractor = {(item, index)=> index.toString()}
                    style={{flex:1, backgroundColor: '#eee'}}
                    renderItem={({item, index}) => (
                        <View key={index} style={styleHome.cardContainer}>
                            <View style={styleHome.cardHeader}>
                                <Text>Time Ago</Text>
                                <Text>@WhereAbouts</Text>
                            </View>
                            <View>
                                <Image
                                    source={{uri: 'https://source.unsplash.com/random/500x' +Math.floor((Math.random() * 800)+ 500)}}
                                    style={styleHome.cardImage}
                                />
                            </View>
                            <View>
                                <Text >Caption goes here...</Text>
                                <Text>View Comments</Text>
                            </View>
                            
                        </View>
                    )}
                />
                
                
            </View>
        )
    }
}

export default HomeScreen