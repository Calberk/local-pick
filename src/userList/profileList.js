import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {f, auth, database, storage} from '../../config/config';
import styles from './profileListStyle';
import background from '../../assets/backdrop.jpg';


class ProfileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            spots: [],
            refreshing: false,
            loading: true
        }
    }

    componentDidMount =()=>{
        const {isUser, userId} = this.props;

        if(isUser === true){
            this.loadFeed(userId)
            console.log('userId', userId)
        }else{
            this.loadFeed('');
        }
    }

    loadFeed =(userId='') => {
        this.setState({
            refreshing: true,
            spots: []
        });

        var that = this

        var loadRef= database.ref('photos');
        if(userId !== ''){
            loadRef = database.ref('users').child(userId).child('hotSpots');
        }

        loadRef.orderByChild('timestamp').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
            var spots= that.state.spots;  

            for(var photo in data){
                that.addToFlatList(spots, data, photo, userId);
            }
        }).catch(error=> console.log(error));
    }

    addToFlatList = (spots, data, photo, userId)=>{
        var that = this;
        var spotObj = data[photo];
        database.ref('users').child(userId).child('username').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                spots.push({
                    id: photo,
                    url: spotObj.photo,
                    title: spotObj.category,
                    author: spotObj.username,
                    name: spotObj.name
                    // authorId: spotObj.author
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
                onRefresh = {this.loadNew}
                onEndReached = {this.handleLoad}
                data = {this.state.spots}
                keyExtractor = {(item, index)=> index.toString()}
                renderItem={({item, index}) => (
                    <ImageBackground
                    resizeMode={'cover'}
                    style={{flex:1, alignItems: 'center',}}
                    source={background}
                >
                    {/* <View style={{justifyContent: 'center', alignItems: 'center'}}> */}
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.titleText}>{item.title}</Text>
                                <Text style={styles.nameText}>{item.name}</Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.url}&key=AIzaSyCXZxoa0P09f1o6y3RnGWwZ6m7vSPYEQ-k`}}
                                    style={styles.cardImage}
                                />
                            </View>
                            <View>
                                
                                {/* <TouchableOpacity
                                    onPress={()=> this.props.navigation.navigate('Comments')}
                                >
                                    <Text style={styles.commentText}>[View Comments]</Text>
                                </TouchableOpacity> */}
                            </View>      
                        </View>
                    </ImageBackground>
                    
                )}
                />  
            )}
            </View>
        )
    }
}

export default ProfileList