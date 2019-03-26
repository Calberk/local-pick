import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {f, auth, database, storage} from '../../config/config';
import MapView from 'react-native-maps';
import Api from '../../config/search';
import HeaderBar from '../components/headerBar';
import styles from './styleSearch';

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
        };
    }

    componentDidMount = () => {
        var that = this;
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
                that.hotSpotsList(spots, data, spot);
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

    hotSpotsList = (spots, data, spot)=>{
        const that = this;
        const spotObj = data[spot];
        database.ref('users').child(spotObj.user).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                spots.push({
                    id: spot,
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

    searchSpots = () => {
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
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        showsUserLocation={true}
                    />
                </View>
                    

            </View>
        );
    }
}

export default hotSpotSearch;