import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import {f, database, auth} from '../../config/config';



class AuthCheck extends Component{
    constructor(){
        super();
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            that.props.navigation.navigate(user ? 'App' : 'Auth')
            
        })
    
    }


    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default AuthCheck