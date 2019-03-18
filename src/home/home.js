import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './styleHome';
import HeaderBar from '../components/headerBar';
import {Overlay} from 'react-native-elements';
import {f, auth, database, storage} from '../../config/config';
import hotSpot from "../../assets/fireMap.png";  
import _ from 'lodash';
import Api from '../../config/search';


class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            photo_feed: [],
            spots: [],
            refreshing: false,
            loading: true,
            loggedin:false,
            isVisible: false,
            error: '',
            latitude: 0,
            longitude: 0,
            location: '',
            predictions: [],
            placeid: '',
            details: null,
            destination: ''
        };
        this.onChangeLocationDebounced = _.debounce(this.onChangeLocation, 1000)
        
    }

    //     var that = this;
    //     f.auth().onAuthStateChanged(function(user){
    //         if(user){
    //             that.setState({
    //                 loggedin: true
    //             })
    //             that.loadFeed();
    //         }else {
    //             that.setState({
    //                 loggedin: false
    //             });
    //         }
    //     });
    // }

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
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
        );
    }

    // get all user details that are stored in firebase
    getUserData = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            console.log('data', data)
            that.setState({
                username: data.username,
                name: data.name,
                avatar: data.avatar,
                loggedin: true,
                userId: userId,
                location: data.location,
                email: data.email,
                currentImg: data.currentImg
            })
            
        })
    }
    

    loadFeed =() => {
        this.setState({
            refreshing: true,
            photo_feed: []
        });

    // pluralCheck = (s) => {
    //     if(s === 1 ) {
    //         return ' ago';
    //     }else{
    //         return 's ago';
    //     }
    // }

    // timeConversion = (timestamp) => {
    //     var a = new Date(timestamp * 1000);
    //     var seconds = Math.floor((new Date()- a ) / 1000);

    //     var interval = Math.floor(seconds / 31536000);
    //     if(interval > 1 ){
    //         return interval + ' year' + this.pluralCheck(interval);
    //     }
    //     var interval = Math.floor(seconds / 2592000);
    //     if(interval > 1 ){
    //         return interval + ' month' + this.pluralCheck(interval);
    //     }
    //     var interval = Math.floor(seconds / 86400);
    //     if(interval > 1 ){
    //         return interval + ' day' + this.pluralCheck(interval);
    //     }
    //     var interval = Math.floor(seconds / 3600);
    //     if(interval > 1 ){
    //         return interval + ' hour' + this.pluralCheck(interval);
    //     }
    //     var interval = Math.floor(seconds / 60);
    //     if(interval > 1 ){
    //         return interval + ' minute' + this.pluralCheck(interval);
    //     }
    //     return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);

    // }

    var that = this
    database.ref('photos').orderByChild('posted').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
            var photo_feed= that.state.photo_feed;  

            for(var photo in data){
                var photoObj = data[photo];
                database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot){
                    const exists = (snapshot.val() !==null);
                    if(exists) data = snapshot.val();    
                    photo_feed.push({
                            id: photo,
                            url: photoObj.url, 
                            caption: photoObj.caption,
                            posted: photoObj.posted,
                            author: data
                        });
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

    addHotSpot = () => {

    }

    onChangeLocation = async (location) => {
        const gpi = Api.gApi
        this.setState({
            location
        });
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${gpi}&input=${location}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            this.setState({
                predictions: json.predictions,
            })
        } catch (err) {
            console.log(err);
        }
    }

    selectLocation = async (placeid, destinationName) => {
        const gpi = Api.gApi
        this.setState({
            placeid,
            predictions: [],
            destination: destinationName
        });
        console.log('props', placeid, destinationName, this.state)
        // const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${gpi}&placeid=${placeid}&fields=name,formatted_address,photo,website,id,formatted_phone_number`;
        // try {
        //     const result = await fetch(apiUrl);
        //     const json = await result.json();
        //     console.log(json);
        //     // this.setState({
        //     //     details: json.result,
        //     // })
        // } catch (err) {
        //     console.log(err);
        // }
    }

    render() {

        const predictions = this.state.predictions.map(( prediction, index ) => (
            <TouchableOpacity
                style={index == 4 ? styles.suggestionsRoundedBottom : styles.suggestions}
                onPress={() => this.selectLocation(prediction.place_id, prediction.structured_formatting.main_text)}
                key={prediction.id}
                index={index}
            >
                <Text >{prediction.description}</Text>
            </TouchableOpacity>
        ));

        return (
            <View style={styles.mainContainer}>
                <HeaderBar 
                    title='Home'
                    hasRightIcon
                    type='ionicon'
                    rightIcon='md-add'
                    size={40}
                    onPressRight={()=>this.setState({isVisible: true})}
                />

                {!this.state.spots.length ? (
                    <View title="WELCOME" style={styles.content}>
                        <Text style={styles.header}>
                            Welcome to <Text style={{color: '#cc0000', fontFamily: 'antonellie'}}>Hot Spot</Text>
                        </Text>
                        <Text style={styles.text}>
                            Start by adding your first spot
                        </Text>
                    </View>
                ) : (

                this.state.loading === true ? (
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
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text>{item.posted}</Text>
                                <Text>{item.author}</Text>
                            </View>
                            <View>
                                <Image
                                    source={{uri: item.url}}
                                    style={styles.cardImage}
                                />
                            </View>
                            <View>
                                <Text >{item.caption}</Text>
                                <Text>View Comments</Text>
                            </View>      
                        </View>
                    )}
                    />  
                )
                )
                
        }

                <Overlay
                    isVisible={this.state.isVisible}
                    width='90%'  
                    height={600}  
                    animationType= 'slide'
                    overlayStyle={{borderRadius:15, padding: 0, borderWidth: 4, borderColor: '#cc0000', backgroundColor: 'rgba(228, 233, 237, 1)'}}
                    onBackdropPress={()=> this.setState({isVisible: false})}
                >
                    <View style={styles.modalMain}>
                        <View style={styles.imageContainer}>
                            <Image 
                            style={styles.image}
                            resizeMode={'contain'}
                            source={hotSpot}
                            />
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.descriptionText}>Create your very own <Text style={{color: '#cc0000', fontFamily: 'antonellie'}}>Hot Spot</Text>.{"\n"}Select your category of choice, find the location and share your thoughts!</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <TextInput 
                                style={styles.largeTextInput}
                                placeholder='Favorite Category'
                                underlineColorAndroid='transparent'
                                value={this.props.name}
                                onChangeText = {value => this.changeText('category', value)}    
                            />
                            <TextInput 
                                // style={styles.largeTextInput}
                                placeholder='Search...'
                                underlineColorAndroid='transparent'
                                value={this.state.destination}
                                onChangeText={destination => {this.setState({destination}); this.onChangeLocationDebounced(destination)}}
                                style={this.state.predictions.length == 0 ? styles.locationInput : styles.locationInputWithPredictions}
                            />
                                { predictions }
                            <TextInput 
                                style={styles.largeTextInput}
                                placeholder='Comments'
                                underlineColorAndroid='transparent'  
                                value={this.props.location}
                                onChangeText = {value => this.changeText('comments', value)}      
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.buttonCancel}
                                onPress={()=> {this.setState({isVisible: false}); console.log(this.state)}}
                            >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>  
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.addHotSpot}
                            >
                            <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay>
            </View>
        )
    }
}

export default HomeScreen