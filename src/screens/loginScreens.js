import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import Landing from '../landing/landing'
import Registration from '../register/registration';
import Login from '../login/login';
import HomeScreen from '../home/home';

const LoginScreens = createStackNavigator({
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
        tabBarIcon: 
    },
    Favorite: FavoriteScreen,
    Search: SearchScreen,
    Profile: ProfileScreen
});


export default createAppContainer(createSwitchNavigator(
    {
        Auth: LoginScreens,
        App: TabNavigator
    }
));