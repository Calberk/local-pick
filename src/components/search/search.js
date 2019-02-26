import React, {Component} from 'react';
import {View, Text } from 'react-native';

class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Search'
    };

    render() {
        return (
            <View style={styleHome.container}>
                <Text style={styleHome.textBox}>Search</Text>
            </View>
        )
    }
}

export default SearchScreen