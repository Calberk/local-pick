import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const registerStyle = StyleSheet.create({
    mainContainer: {
        width,
        height,
        backgroundColor: '#fff'
    },
    topContainer: {
        height: height * 0.08,
        width,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },  
    nameSection: {
        height: height * 0.08,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    smallTextInput: {
        height: height * 0.08,
        width: width * 0.85/2,
        borderColor: 'rgb(185,185,185)',
        borderWidth: 1,
        borderRadius: 1,
        padding: 8,
        fontSize: 18
    },
    largeTextInput: {
        height: height * 0.08,
        width: width * 0.85,
        borderColor: 'rgb(185,185,185)',
        borderWidth: 1,
        borderRadius: 1,
        padding: 8,
        fontSize: 18
    },
    bottomContainer: {
        flex: 3,
        alignItems: 'center',
    },
    button: {
        height: height * 0.08,
        width: width * 0.85,
        marginTop: 8,
        backgroundColor: 'black',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }

});

export default registerStyle;