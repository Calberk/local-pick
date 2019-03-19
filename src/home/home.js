import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
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
            location: '',
            loggedin:false,
            isVisible: false,
            name: '',
            error: '',
            latitude: 0,
            longitude: 0,
            selectedLat: '',
            selectedLong: '',
            predictions: [],
            placeid: '',
            destination: '',
            selectedPhoto: '',
            selectedNumber: '',
            selectedWebsite: '',
            userId: '',
            username: '',
            hotSpotId: this.uniqueId(),
            category: '',
            comment: ''


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
                that.getUserData(user.uid);
            }else {
                that.setState({
                    loggedin: false
                });
            }
        });
        navigator.geolocation.getCurrentPosition(
            position => {
                that.setState({
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
            that.loadFeed();
        })
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
    

    loadFeed =() => {
        this.setState({
            refreshing: true,
            photo_feed: []
        });

        const that = this

        const loadRef= database.ref('users').child(that.state.userId).child('hotSpots');
        

        loadRef.orderByChild('timestamp').once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
        console.log('data',data)
            var spots= that.state.spots;  

            for(var photo in data){
                that.addToFlatList(spots, data, photo);
            }
        }).catch(error=> console.log(error));
    }

    addToFlatList = (spots, data, photo, userId)=>{
        const that = this;
        const spotObj = data[photo];
        database.ref('users').child(that.state.userId).child('username').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                spots.push({
                    id: photo,
                    url: spotObj.photo,
                    title: spotObj.category,
                    author: spotObj.username,
                    caption: spotObj.name
                    // authorId: spotObj.author
                });
                console.log('spots', spots)
                that.setState({
                    refreshing: false,
                    loading: false
                });
        }).catch(error=> console.log(error));
    }


    // var that = this
    // database.ref('photos').orderByChild('posted').once('value').then(function(snapshot){
    //     const exists = (snapshot.val() !== null);
    //     if(exists) data = snapshot.val();
    //         var photo_feed= that.state.photo_feed;  

    //         for(var photo in data){
    //             var photoObj = data[photo];
    //             database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot){
    //                 const exists = (snapshot.val() !==null);
    //                 if(exists) data = snapshot.val();    
    //                 photo_feed.push({
    //                         id: photo,
    //                         url: photoObj.url, 
    //                         caption: photoObj.caption,
    //                         posted: photoObj.posted,
    //                         author: data
    //                     });
    //                     that.setState({
    //                         refreshing: false,
    //                         loading: false
    //                     });
    //             }).catch(error=> console.log('error', error));
    //         }    
    // }).catch(error=> console.log('error', error));
    // }

    loadNew =() => {
        //Load all new hotspots
        this.loadFeed()
    }

    addHotSpot = async () => {
        let hotSpotId = this.state.hotSpotId;
        let website = this.state.selectedWebsite;
        let lat = this.state.selectedLat;
        let long = this.state.selectedLong;
        let phNumber = this.state.selectedNumber;
        let photo = this.state.selectedPhoto;
        let name = this.state.destination;
        let user = this.state.userId;
        let category = this.state.category;
        let comment = this.state.comment;
        let dateTime = Date.now();
        let timeStamp = Math.floor(dateTime/1000);

        let hotSpotObj = {
            category,
            username: this.state.username,
            name,
            photo,
            phNumber,  
            latitude: lat,
            longitude: long,
            website,
            comment,
            timeStamp
        }

        if(category !== '' && name !== '' && comment !== ''){
            database.ref('/hotSpots/'+ hotSpotId +'/' + category +'/' + user).set(hotSpotObj);
            database.ref('/users/' + user + '/hotSpots/' + hotSpotId).set(hotSpotObj)
        }

        this.setState({
            isVisible: false,
            destination: '',
            selectedPhoto: '',
            selectedNumber: '',
            category: '',
            selectedLat: '',
            selectedLong: '',
            selectedWebsite: '',
            comment: '',
        });
        ToastAndroid.showWithGravity(
            'Hot Spot Created!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        
    }

    onChangeLocation = async (location) => {
        const gpi = Api.gApi
        // this.setState({
        //     location
        // });
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
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${gpi}&placeid=${placeid}&fields=url,formatted_address,photo,website,id,formatted_phone_number,geometry`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            // this.setState({
            //     photoId: json.
            // })
            
            const selectedPhoto = json.result.photos[0].photo_reference
            const selectedLat = json.result.geometry.location.lat
            const selectedLong = json.result.geometry.location.lng
            const selectedNumber = json.result.formatted_phone_number
            const selectedWebsite = json.result.url
            this.setState({
                selectedPhoto,
                selectedLat,
                selectedLong,
                selectedNumber,
                selectedWebsite,
                hotSpotId: this.uniqueId()
            })
        } catch (err) {
            console.log(err);
        }

    }

    
    changeText = (type, value) => {
    
        this.setState({[type]: value})
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
                    data = {this.state.spots}
                    keyExtractor = {(item, index)=> index.toString()}
                    style={{flex:1, backgroundColor: '#eee'}}
                    renderItem={({item, index}) => (
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text>{item.posted}</Text>
                                <Text>{item.title}</Text>
                            </View>
                            <View>
                                <Image
                                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.url}&key=AIzaSyCXZxoa0P09f1o6y3RnGWwZ6m7vSPYEQ-k`}}
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
                    overlayStyle={{borderRadius:15, padding: 0, borderWidth: 4, borderColor: '#cc0000', backgroundColor: 'rgba(243, 241, 239, 1)'}}
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
                                value={this.props.category}
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
                                value={this.props.comment}
                                onChangeText = {value=> this.changeText('comment', value)}      
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.buttonCancel}
                                onPress={()=> this.setState({isVisible: false})}
                            >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>  
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>this.addHotSpot()}
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