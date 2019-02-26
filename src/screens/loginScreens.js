import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import Landing from '../landing/landing'
import Registration from '../register/registration';
import Login from '../login/login';

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
    Home: HomeScreen,
    Favorite: FavoriteScreen,
    Search: SearchScreen,
    Profile: AccountScreen
});


export default createAppContainer(createSwitchNavigator(
    {
        Auth: LoginScreens,
        App: TabNavigator
    }
));