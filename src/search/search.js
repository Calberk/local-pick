import React, { Component } from 'react';
import {Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {f, auth, database, storage} from '../../config/config';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps'
import Api from '../../config/search';
import {Ionicons} from '@expo/vector-icons'
import HeaderBar from '../components/headerBar';
import styles from './styleSearch';
import icon from '../../assets/fireMap3.png';
import {withNavigationFocus} from 'react-navigation'

class hotSpotSearch extends Component {
    constructor(props){
        super(props);

        this.state={
            error: '',
            latitude: 0,
            longitude: 0,
            location: '',
            spots: [],
            placeid: '',
            search: '',
            userId: '',
        };
    }

    componentDidMount = () => {

        var that = this;

        navigator.geolocation.getCurrentPosition(
            position => {
                that.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => that.setState({ error: error.message }),
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
        );


        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.getUserData(user.uid);
                that.getHotSpots()
            }else {
                that.setState({
                    loggedin: false
                });
            }
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isFocused !== this.props.isFocused){
            this.getHotSpots();
        }
    }

    getUserData = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            that.setState({
                // username: data.username,
                // name: data.name,
                // avatar: data.avatar,
                // currentImg: data.currentImg
                loggedin: true,
                userId: userId,
                location: data.location,

            })
        }).catch((error)=>console.log(error))
    }

    getHotSpots = () => {
        this.setState({
            refreshing: true,
            spots: []
        });

        const that = this
        const loadRef= database.ref('hotSpots').orderByChild('timeStamp')

        loadRef.once('value').then(function(snapshot){
        const exists = (snapshot.val() !== null);
            if(exists){
                data = snapshot.val();
                var spots= that.state.spots;  

                for(var spot in data){
                    const spotObj = data[spot]
                    spots.push({
                        id: spot,
                        url: spotObj.photo,
                        category: spotObj.category,
                        coords: spotObj.coords,
                        name: spotObj.name,
                        number: spotObj.phNumber,
                        map: spotObj.map,
                        comment: spotObj.comment,
                        address: spotObj.address,
                        // website: spotObj.website,
                        authorId: spotObj.user,
                        
                });
                    that.setState({
                        refreshing: false,
                        loading: false
                    });
                } 
            }else{
                that.setState({
                    spots: [],
                    refreshing: false,
                    loading: false
                })
            }
        }).catch(error=> console.log(error));
    }

    searchSpots = () => {
        if(search !== ''){
            database.ref('hotSpots')
        }else{
            return
        }
    }
    

    render(){

        return (
            <View style={styles.container}>
                <HeaderBar 
                        title='Hot Spots'
                    />
                <View style={styles.mainSection}>
                    <View>
                        <TextInput 
                                underlineColorAndroid="transparent"
                                placeholder="Filter Hot Spots..." 
                                value={this.state.search} 
                                onChangeText={(text)=>this.setState({search: text })}
                                style={styles.searchBar}
                            />
                        <TouchableOpacity
                            style={styles.searchBtn}
                            onPress={()=>this.searchSpots()}
                        >
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>

                    <MapView
                        style={styles.map} 
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.098,
                            longitudeDelta: 0.092,
                        }}
                        showsUserLocation={true}
                    >
                    {this.state.spots.map((marker, index)=>(
                        <MapView.Marker
                            coordinate={{latitude: marker.coords.lat, longitude: marker.coords.long}}
                            key = {marker.id}
                            // title = {marker.caption}
                            
                            // image = {icon}
                        >
                        <Image 
                            source={icon}
                            resizeMode='contain'
                            style={{height: 50}}
                        />
                        <MapView.Callout
                        tooltip={true}
                        >
                            <View style={styles.infoContainer}>
                                <View style={styles.infoHeader}>
                                    <Text style={styles.category}>{marker.category}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.name}>{marker.name}</Text>
                                    <Text>"{marker.comment}"</Text>
                                </View>
                                <View style={styles.footer}>
                                    <View style={styles.footerInfo}>
                                        <Text style={{fontSize: 10, textAlign: 'center', color: '#fff'}}>{marker.address} <Text style={{fontSize: 8, color: '#fff'}}>{marker.number}</Text></Text>
                                        
                                    </View>
                                </View>
                            </View>
                        </MapView.Callout>
                        </MapView.Marker>
                    ))}
                    
                    </MapView>
                </View>
                    

            </View>
        );
    }
}

export default withNavigationFocus(hotSpotSearch);