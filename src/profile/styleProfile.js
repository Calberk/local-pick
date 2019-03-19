import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleProfile = StyleSheet.create({
    mainContainer: {
        width,
        height,
        backgroundColor: 'black'
    },
    textContainer: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    textBox: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 35,
        backgroundColor: 'orange'
    },
    profileInfo: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 3,
        borderColor: '#fff'
    },
    avatarContainer: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderColor: 'grey',
        // backgroundColor: 'rgba(204,0,0, 0.6)',
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    avatar: {
        // marginLeft: 10,
        width: 180, 
        height: 180,
        borderRadius: 90,
        // borderColor: 'rgba(204,0,0, 0.8)',
        borderColor: '#fff',
        borderWidth: 3,
    },
    avatarUpdateBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cc0000',
        height: 45,
        width: 45,
        borderRadius: 25,
        position: 'absolute',
        elevation: 15,
        bottom: 0,
        right: 0
    },
    profileSection: {
        width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfo: {
        // marginRight: 10,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    nameText:{
        fontSize: 32,
        fontFamily: 'openSans',
        color: '#fff',
        textAlign: 'center'
    },
    emailText: {
        fontSize: 18,
        fontFamily: 'openSans',
        color: '#fff',
        textAlign: 'center'
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationText:{
        fontSize: 26,
        fontFamily: 'openSans',
        fontStyle: 'italic',
        color: 'rgba(108, 122, 137, 1)'
    },
    buttonSection:{
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    editPencil: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 20 
    },
    editButton:{
        backgroundColor: 'transparent',
        // borderRadius: 30,
        // elevation: 5
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
        color: '#fff',
        // backgroundColor: '#cc0000',
        // borderWidth: 1,
        elevation: 5
    },
    modalContainer: {
        // flex: 1,
        // height:'100%',
        // justifyContent: 'space-evenly'
    },
    modalHeader: {
        // width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#cc0000',
    },
    modalMain: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 4
    },
    modalContent: {
        width: 'auto',
        justifyContent: 'center',
    },
    largeTextInput: {
        height: height * 0.08,
        width: width * 0.85,
        borderColor: 'rgba(108, 122, 137, 0.8)',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 8,
        marginBottom: 15,
        fontSize: 18,
        paddingHorizontal: 15,
        elevation: 5
    },
    buttonContainer: {
        width: '100%',
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        // marginTop: 20
    },
    button: {
        height: height * 0.06,
        width: '80%',
        marginTop: 8,
        backgroundColor: '#cc0000',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },



});

export default styleProfile