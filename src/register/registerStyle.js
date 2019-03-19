import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const registerStyle = StyleSheet.create({
    mainContainer: {
        width,
        height,
        backgroundColor: '#fff',
    },
    // topContainer: {
    //     height: height * 0.08,
    //     width,
    //     marginTop: 16,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     backgroundColor: 'red'
    // },
    topContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topRegisterContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },  
    loginInput: {
        height: height * 0.08,
        width: width * 0.85,
        borderColor: 'rgba(108, 122, 137, 0.8)',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        fontSize: 18,
        elevation: 5,
        marginBottom: 30
    },
    largeTextInput: {
        height: height * 0.08,
        width: width * 0.85,
        borderColor: 'rgba(108, 122, 137, 0.8)',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        fontSize: 18,
        elevation: 5
    },
    bottomContainer: {
        flex: 3,
        alignItems: 'center',
    },
    bottomRegisterContainer: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        height: height * 0.08,
        width: width * 0.85,
        marginTop: 8,
        backgroundColor: '#cc0000',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }

});

export default registerStyle;