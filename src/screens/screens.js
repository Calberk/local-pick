import React from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import Landing from '../landing/landing'
import Registration from '../register/registration';
import Login from '../login/login';

import FavoriteScreen from '../favorites/favorites';
import SearchScreen from '../search/search';
import HomeScreen from '../home/home';
import ProfileScreen from '../profile/profile';

import {Ionicons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';


const Screens = createStackNavigator({
    Landing: {
        screen: Landing,
        navigationOptions: {
            header: null,
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        },
    },
    Registration: {
        screen: Registration,
        navigationOptions: {
            header: null,
        },
    },
}, {
    mode: 'modal',
});

const TabNavigator = createBottomTabNavigator ({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarOptions: {
                activeTintColor: '#cc0000',
                inactiveTintColor: 'gray',
            },
            tabBarIcon: ({tintColor})=>(
                <Ionicons name='md-home' size={26} color={tintColor}/>
            )
        }
    },
    Favorite: {
        screen: FavoriteScreen,
        navigationOptions: {
            tabBarLabel: "Favorites",
            tabBarOptions: {
                activeTintColor: '#cc0000',
                inactiveTintColor: 'gray',
            },
            tabBarIcon: ({tintColor})=>(
                <Ionicons name='md-heart' size={26} color={tintColor}/>
            )
        },
    },
    // Search: {
    //     screen: SearchScreen,
    //     navigationOptions: {
    //         tabBarLabel: "Search",
    //         tabBarOptions: {
    //             activeTintColor: '#cc0000',
    //             inactiveTintColor: 'gray',
    //         },
    //         tabBarIcon: ({tintColor})=>(
    //             <Ionicons name='md-search' size={26} color={tintColor}/>
    //         )
    //     },
    // },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarOptions: {
                activeTintColor: '#cc0000',
                inactiveTintColor: 'gray',
            },
            tabBarIcon: ({tintColor})=>(
                <Entypo name='dots-three-horizontal' size={26} color={tintColor}/>
            )
        },
    },
},{
    navigationOptions: {
        headerTitle: 'asdf',
        headerStyle: {
            backgroundColor: "blue"
        },
        headerTitleStyle: {
            fontWeight: "bold",
            color: "green",
            fontSize: 24,
        },
        headerTintColor: "#fff"
    }  
}  
);


export default createAppContainer(createSwitchNavigator(
    {
        Auth: Screens,
        App: TabNavigator
    }
));