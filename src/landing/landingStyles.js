import {StyleSheet, Dimensions} from 'react-native'

const {width, height } = Dimensions.get('window');
const styles = StyleSheet.create ({
    mainContainerView: {
        flex:1,
        flexDirection: 'column',
        // backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoView: {
        flex: 2,
        // backgroundColor: 'blue',
        marginTop: 50,
        // maxHeight: 100,
    },
    titleView: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'antonellie',
        color: '#cc0000',
        fontSize: 60,
    },
    subTitleView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitleText: {
        color: 'black',
        fontSize: 24,
    },
    imageView: {
        width,
        height: width * (9/12),
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: '60%',
        width: '60%',
    },
    buttonView:{
        flex: 2,
        width,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    fbButton:{
        backgroundColor: '#3b5998',
        width: '80%',
        height: '25%',
        borderRadius: 30,
        // marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent:'center'
    },
    signInButton: {
        backgroundColor: "#cc0000",
        width: '80%',
        height: '25%',
        borderRadius: 30,
        // marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent:'center'
    },
    fbText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Roboto'
    },
    signInText: {
        color: '#fff',
        fontSize: 18
    },
    registerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold' 
    },
    form: {
        flex: 1
    },
    signUpContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default styles;