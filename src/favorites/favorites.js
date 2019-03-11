import React, {Component} from 'react';
import {View, Text } from 'react-native';
import styleFavorites from './styleFavorites';
import NavBarDown from '../components/headerBar';
import {SearchBar} from 'react-native-elements';
import {f, database, auth} from '../../config/config';


class FavoriteScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            search: '',
            loggedin: false
        };
    }

    updateSearch = search => {
        this.setState({search})
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.setState({
                    loggedin: true
                })
            }else {
                that.setState({
                    loggedin: false
                });
            }
        });
    }

    render() {

        const {search} = this.state;

        return (
            <View style={styleFavorites.mainContainer}>
                {this.state.loggedin === true ? (
                    <View>
                        <NavBarDown
                            title='WhereAbouts'
                        />
                        <SearchBar
                            platform = 'android'
                            placeholder='Search a favorite'
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                        <View style={styleFavorites.textContainer}>
                            <Text style={styleFavorites.textBox}>Favorites</Text>
                        </View>
                    </View>
                ):(
                    <View>
                        <Text>You are not logged in</Text>
                        <Text>Please login to view your profile</Text>
                    </View>
                )}        
            </View>
        )
    }
}

export default FavoriteScreen