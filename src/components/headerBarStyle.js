import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const TOPBAR_HEIGHT = height * 0.08;
const headerBarStyle = StyleSheet.create({
    // topBar: {
    //     width,
    //     height: TOPBAR_HEIGHT,
    //     backgroundColor: 'black',
    //     flexDirection: 'row',
    //     alignItems: 'flex-end',
    //     justifyContent: 'space-between',
    //     textAlign: 'center'
    // },
    // navBarText: {
    //     color: '#fff',
    //     fontSize: 18,
    //     flexDirection: 'row',
    //     // justifyContent: 'flex-end',
    //     marginBottom: 8,
    //     marginRight: 10,
    // },
    // headerIcon: {
    //     flexDirection: 'row',
    //     paddingLeft: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    navBarContainer: {
        height: TOPBAR_HEIGHT + Expo.Constants.statusBarHeight,
        width,
        backgroundColor: '#cc0000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8"
    },
    navTitle: {
        fontSize: 28,
        color: '#fff',
        fontFamily: 'antonellie',
    },
    leftBtn: {
        position: 'absolute', 
        left: 15, 
        bottom: 0,
        marginBottom: 15
    },
    rightBtn: {
        position: 'absolute', 
        right: 15, 
        bottom: 0,
        marginBottom: 15
    }
});

export default headerBarStyle;