import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleSearch from './styleSearch';
import {SearchBar} from 'react-native-elements';

class SearchScreen extends Component {
    state = {
        search: '',
    }

    updateSearch = search => {
        this.setState({search})
    }

    render() {

        const {search}   = this.state
        return (
            <View style={styleSearch.mainContainer}>
                <View style={styleSearch.textContainer}>
                    <Text style={styleSearch.textBox}>Search</Text>
                    <SearchBar 
                        platform = 'android'
                        placeholder='Search a favorite'
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                </View>
            </View>
        )
    }
}

export default SearchScreen