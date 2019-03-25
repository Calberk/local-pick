import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, TextInput, ToastAndroid, KeyboardAvoidingView, Linking } from 'react-native';
import styles from './styleHome';
import HeaderBar from '../components/headerBar';
import {Overlay} from 'react-native-elements';
import {f, auth, database, storage} from '../../config/config';
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import hotSpot from "../../assets/fireMap.png";  
import _ from 'lodash';
import Api from '../../config/search';


class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            category: '',
            comment: '',
            commentId: this.uniqueId(),
            destination: '',
            error: '',
            hotSpotId: this.uniqueId(),
            isVisible: false,
            latitude: 0,
            longitude: 0,
            loading: true,
            location: '',
            loggedin:false,
            name: '',
            refreshing: false,
            predictions: [],
            placeid: '',
            selectedLat: '',
            selectedLong: '',
            selectedPhoto: '',
            selectedMap:'',
            selectedNumber: '',
            selectedWebsite: '',
            spots: [],
            userId: '',
            username: '',
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
        }).catch((error)=>console.log(error))
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
            spots: []
        });

        const that = this

        // const loadRef= database.ref('users').child(that.state.userId).child('hotSpots');
        const loadRef= database.ref('hotSpots').orderByChild('timeStamp')

        loadRef.once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
        if(exists){
            data = snapshot.val();
            var spots= that.state.spots;  

            for(var photo in data){
                that.addToFlatList(spots, data, photo);
            }
        } else{
            that.setState({
                spots: [],
                refreshing: false,
                loading: false
            })
        }
        }).catch(error=> console.log(error));
    }

    addToFlatList = (spots, data, photo)=>{
        const that = this;
        const spotObj = data[photo];
        database.ref('users').child(spotObj.user).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                spots.push({
                    id: photo,
                    url: spotObj.photo,
                    title: spotObj.category,
                    author: data.username,
                    caption: spotObj.name,
                    number: spotObj.phNumber,
                    map: spotObj.map,
                    website: spotObj.website,
                    authorId: spotObj.user
                    
                });
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
        let map = this.state.selectedMap;
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
        let commentId = this.state.commentId

        let hotSpotObj = {
            category,
            user,
            name,
            photo,
            phNumber,  
            latitude: lat,
            longitude: long,
            website,
            comment,
            timeStamp,
            map
        }

        let commentObj = {
            user,
            comment,
            timeStamp,
        }

        if(category !== '' && name !== '' && comment !== ''){
            // database.ref('/hotSpots/'+ hotSpotId +'/' + category +'/' + user).set(hotSpotObj);
            // database.ref('/users/' + user + '/hotSpots/' + hotSpotId).set(hotSpotObj)
            database.ref('/hotSpots/'+ hotSpotId).set(hotSpotObj);
            database.ref('/users/' + user + '/hotSpots/'+ hotSpotId ).set(hotSpotObj)
            // database.ref('/comments/' + hotSpotId +'/'+ commentId).set(commentObj)
            // database.ref('/comments/'+ hotSpotId).set(hotSpotObj);
        }

        this.setState({
            isVisible: false,
            destination: '',
            selectedPhoto: '',
            selectedNumber: '',
            category: '',
            created: true,
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
        this.loadFeed();
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
            console.log(json)
            const selectedPhoto = json.result.photos[0].photo_reference
            const selectedLat = json.result.geometry.location.lat
            const selectedLong = json.result.geometry.location.lng
            const selectedNumber = json.result.formatted_phone_number
            const selectedMap = json.result.url
            const selectedWebsite = json.result.website
            this.setState({
                selectedPhoto,
                selectedLat,
                selectedLong,
                selectedNumber,
                selectedMap,
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

    calll=(number)=>{
        const url = `tel://${number}`
        Linking.openURL(url)
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

                {this.state.spots.length===0 ? (
                    <View title="WELCOME" style={styles.content}>
                        <Text style={styles.header}>
                            Welcome to <Text style={{color: '#cc0000', fontFamily: 'antonellie'}}>Hot Spot</Text>
                        </Text>
                        <Text style={styles.text}>
                            Loading spots . . .
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
                    style={{flex:1, backgroundColor: '#eee', marginBottom: 45}}
                    automaticallyAdjustContentInsets={false}
                    renderItem={({item, index}) => (
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.titleText}>{item.title}</Text>
                                <Text style={styles.nameText}>{item.caption}</Text>
                                <View style={styles.authorContainer}>
                                    <TouchableOpacity
                                        onPress={()=>this.props.navigation.navigate('User', {userId: item.authorId})}
                                        style={{flexDirection:'row', alignItems: 'center'}}
                                    >
                                    <FontAwesome name='user-circle' size={18} color='rgba(108, 122, 137, 1)'/>
                                    <Text style={styles.author}>{item.author}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Image
                                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.url}&key=AIzaSyCXZxoa0P09f1o6y3RnGWwZ6m7vSPYEQ-k`}}
                                    style={styles.cardImage}
                                />
                            </View>
                            <View  style={{flexDirection:'row', padding: 10}}>
                                <View style={{width: '25%'}}>
                                    <TouchableOpacity title='call' onPress={()=>this.calll(item.number)} style={{alignItems:'center'}}>
                                        <FontAwesome name='phone' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: '25%'}}>
                                    <TouchableOpacity title='call' onPress={()=> Linking.openURL(item.map)} style={{alignItems:'center'}}>
                                        <MaterialCommunityIcons name='map-marker-radius' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: '25%' }}>
                                    <TouchableOpacity title='call' onPress={()=> Linking.openURL(item.website)} style={{alignItems:'center'}}>
                                        <MaterialCommunityIcons name='web' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: '25%'}}>
                                    <TouchableOpacity title='call' onPress={()=>this.props.navigation.navigate('Comments', {hotSpotId: item.id})} style={{alignItems:'center'}}>
                                        <FontAwesome name='commenting-o' size={30} color='rgba(255,255,255, 0.8)'/>
                                    </TouchableOpacity>
                                
                                </View>
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
                    overlayStyle={{borderRadius:15, padding: 0, borderWidth: 3, borderColor: '#cc0000', backgroundColor: 'rgba(243, 241, 239, 1)'}}
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

                            <Text style={styles.descriptionText}>Loading <Text style={{color: '#cc0000', fontFamily: 'antonellie'}}>Hot Spot</Text>.{"\n"}Create a category, find the location and share why you love it!</Text>
                        </View>
                            <View style={styles.modalContent}>
                                <TextInput 
                                    underlineColorAndroid="transparent"
                                    style={styles.largeTextInput}
                                    placeholder='Favorite Category'
                                    value={this.props.category}
                                    onChangeText = {value => this.changeText('category', value)}    
                                />
                                <TextInput 
                                    underlineColorAndroid="transparent"
                                    // style={styles.largeTextInput}
                                    placeholder='Search...'
                                    value={this.state.destination}
                                    onChangeText={destination => {this.setState({destination}); this.onChangeLocationDebounced(destination)}}
                                    style={this.state.predictions.length == 0 ? styles.locationInput : styles.locationInputWithPredictions}
                                />
                                    { predictions }
                                <TextInput 
                                    underlineColorAndroid="transparent"
                                    style={styles.largeTextInput}
                                    placeholder='Comments'
                                    value={this.props.comment}
                                    onChangeText = {value=> this.changeText('comment', value)}      
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    style={styles.buttonCancel}
                                    onPress={()=> this.setState({isVisible: false})}
                                >
                                <Text style={styles.cancelText}>Cancel</Text>
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