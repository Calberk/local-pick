import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
            predictions: [],
            placeid: '',
            details: null,
            search: '',
        };
    }

    componentDidMount = () => {
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

    // onChangeLocation = async (location) => {
    //     const gpi = Api.gApi
    //     this.setState({
    //         location
    //     });
    //     const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${gpi}&input=${location}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
    //     try {
    //         const result = await fetch(apiUrl);
    //         const json = await result.json();
    //         this.setState({
    //             predictions: json.predictions,
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // selectLocation = async (placeid) => {
    //     const gpi = Api.gApi
    //     this.setState({
    //         placeid
    //     });
    //     const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${gpi}&placeid=${placeid}&fields=name,formatted_address,photo,website,id,formatted_phone_number`;
    //     try {
    //         const result = await fetch(apiUrl);
    //         const json = await result.json();
    //         console.log(json);
    //         // this.setState({
    //         //     details: json.result,
    //         // })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

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