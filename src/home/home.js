import React, {Component} from 'react';
import {View, Text, FlatList, Image } from 'react-native';
import styleHome from './styleHome';
import HeaderBar from '../components/headerBar'
import {Icon} from 'react-native-elements';
import {f, auth, database, storage} from '../../config/config'

class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            photo_feed: [],
            refreshing: false,
            loading: true
        }
    }
    
    
    componentDidMount = () => {
        this.loadFeed();
    }

    loadFeed =() => {
        this.setState({
            refreshing: true,
            photo_feed: []
        });

        const that = this
        database.ref('photos').orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                var photo_feed= that.state.photo_feed;  

                for(var photo in data){
                    var photoObj = data[photo];
                    console.log(data[photo])
                    database.ref('users').child(photoObj.author).once('value').then(function(snapshot){
                        const exists = (snapshot.val() !==null);
                        if(exists) data = snapshot.val();    
                        that.state.photo_feed.push({
                                id: photo,
                                url: photoObj.url, 
                                caption: photoObj.caption,
                                posted: photoObj.posted,
                                author: photoObj.author
                            });
                            console.log(photo_feed)
                            that.setState({
                                refreshing: false,
                                loading: false
                            });
                    }).catch(error=> console.log('error', error));
                }    
        }).catch(error=> console.log('error', error));
    }

    loadNew =() => {

        //Load all new hotspots
        this.loadFeed()
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

                {this.state.loading === true ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Loading...</Text>
                    </View>
                ): (
                <FlatList
                refreshing = {this.state.refreshing}
                onRefresh = {this.loadNew}
                data = {this.state.photo_feed}
                keyExtractor = {(item, index)=> index.toString()}
                style={{flex:1, backgroundColor: '#eee'}}
                renderItem={({item, index}) => (
                    <View key={index} style={styleHome.cardContainer}>
                        <View style={styleHome.cardHeader}>
                            <Text>{item.posted}</Text>
                            <Text>{item.author}</Text>
                        </View>
                        <View>
                            <Image
                                source={{uri: item.url}}
                                style={styleHome.cardImage}
                            />
                        </View>
                        <View>
                            <Text >{item.caption}</Text>
                            <Text>View Comments</Text>
                        </View>      
                    </View>
                )}
                />  
                )}
                
                
                
            </View>
        )
    }
}

export default HomeScreen