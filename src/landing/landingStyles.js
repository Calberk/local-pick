import {StyleSheet, Dimensions} from 'react-native'

const {width, height } = Dimensions.get('window');
const styles = StyleSheet.create ({
    mainContainerView: {
        width,
        height,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleView: {
        flex:2,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        color: 'black',
        fontSize: 35
    },
    subTitleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitleText: {
        color: 'black',
        fontSize: 24
    },
    imageView: {
        width,
        height: width * (9/12),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    buttonView:{
        width: '80%',
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    signInButton: {
        backgroundColor: 'grey',
        width: '40%',
        height: '20%',
        marginRight: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerButton: {
        backgroundColor: 'green',
        width: '40%',
        height: '20%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInText: {
        color: 'white',
        fontSize: 18
    },
    registerText: {
        color: 'white',
        fontSize: 18 
    }
})

export default styles;