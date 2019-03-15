import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import Api from '../../config/search';
import _ from 'lodash';

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
        };
        this.onChangeLocationDebounced = _.debounce(this.onChangeLocation, 1000)
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

    selectLocation = async (placeid) => {
        const gpi = Api.gApi
        this.setState({
            placeid
        });
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${gpi}&placeid=${placeid}&fields=name,formatted_address,photo,website,id,formatted_phone_number`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            console.log(json);
            // this.setState({
            //     details: json.result,
            // })
        } catch (err) {
            console.log(err);
        }
    }

    render(){

        const predictions = this.state.predictions.map(( prediction, index ) => (
            <TouchableOpacity
                style={index == 4 ? styles.suggestionsRoundedBottom : styles.suggestions}
                onPress={() => this.selectLocation(prediction.place_id)}
                key={prediction.id}
                index={index}
            >
                <Text >{prediction.description}</Text>
            </TouchableOpacity>
        ));

        const { favorite } = this.props;

        return (
            <View style={styles.container}>
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
                <TextInput 
                    placeholder="Search.." 
                    value={this.state.destination} 
                    onChangeText={location => this.onChangeLocationDebounced(location)}
                    style={this.state.predictions.length == 0 ? styles.locationInput : styles.locationInputWithPredictions}
                />

                { predictions }

            </View>
        );
    }
}


const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
       ...StyleSheet.absoluteFillObject
    },
    locationInput: {
        height: 40,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderRadius: 5,
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
    },
    locationInputWithPredictions: {
        height: 40,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    suggestions: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        fontSize: 16,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 0,
        borderColor: 'darkgrey',
    },
    suggestionsRoundedBottom: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        fontSize: 16,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: 'darkgrey',
    },
});

export default hotSpotSearch;