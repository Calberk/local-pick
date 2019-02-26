import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleSearch from './styleSearch';

class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Search'
    };

    render() {
        return (
            <View style={styleSearch.container}>
                <Text style={styleSearch.textBox}>Search</Text>
            </View>
        )
    }
}

export default SearchScreen