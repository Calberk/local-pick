import {createStackNavigator, createAppContainer} from 'react-navigation'
import Landing from '../landing/landing'
import Registration from '../register/registration';
import Login from '../login/login';

const HomeScreens = createStackNavigator({
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

export default createAppContainer(HomeScreens)