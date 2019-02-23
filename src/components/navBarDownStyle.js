import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const TOPBAR_HEIGHT = height * 0.08;
const navBarDownStyle = StyleSheet.create({
    topBar: {
        width,
        height: TOPBAR_HEIGHT,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    navBarText: {
        color: '#fff',
        fontSize: 18,
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        marginBottom: 8,
        marginRight: 10,
    },
    headerIcon: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default navBarDownStyle;