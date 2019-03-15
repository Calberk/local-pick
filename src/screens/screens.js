import React from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import Landing from '../landing/landing'
import Registration from '../register/registration';
import Login from '../login/login';
import Search from '../search/search';

import FavoriteScreen from '../favorites/favorites';
import HomeScreen from '../home/home';
import ProfileScreen from '../profile/profile';
import authCheckScreen from '../components/authCheck'

import {Ionicons} from '@expo/vector-icons';


const Screens = createStackNavigator({
    Landing: {
        screen: Landing,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Registration: {
        screen: Registration,
        navigationOptions: {
            header: null
        }
    },
}, {
    initialRouteName: 'Landing',
    mode: 'modal',
});

const TabNavigator = createBottomTabNavigator ({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarOptions: {
                activeTintColor: '#cc0000',
                inactiveTintColor: '#C8C8C8',
            },
            tabBarIcon: ({tintColor})=>(
                <Ionicons name='md-home' size={28} color={tintColor}/>
            )
        }
    },
    Favorite: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: "Favorites",
            tabBarOptions: {
                activeTintColor: '#cc0000',
                inactiveTintColor: '#C8C8C8',
            },
            tabBarIcon: ({tintColor})=>(
                <Ionicons name='md-heart' size={28} color={tintColor}/>
            )
        },
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarOptions: {
                activeTintColor: '#cc0000',
                inactiveTintColor: '#C8C8C8',
            },
            tabBarIcon: ({tintColor})=>(
                <Ionicons name='md-contact' size={30} color={tintColor}/>
            )
        },
    },
});


export default createAppContainer(createSwitchNavigator(
    {
        authCheck: authCheckScreen,
        Auth: Screens,
        App: TabNavigator
    },
    {
        initialRouteName: 'authCheck',
    }
));