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
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,

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
    },
    avatar: {
        // marginLeft: 10,
        width: 180, 
        height: 180,
        borderRadius: 90,
        borderColor: 'rgba(204,0,0, 0.8)',
        borderWidth: 5,
        // elevation: 10,
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
    userInfo: {
        // marginRight: 10,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    nameText:{
        fontSize: 32,
        fontFamily: 'Roboto',

        textAlign: 'center'
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationText:{
        fontSize: 26,
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        color: 'rgba(108, 122, 137, 1)'
    },
    buttonSection:{
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    editButton:{
        marginTop: 10,
        marginHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        borderColor: 'grey' ,
        borderWidth: 1.5
    },
    logoutButton: {
        marginTop: 10,
        marginHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        borderColor: '#cc0000' ,
        borderWidth: 1.5
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
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#cc0000',
    },
    modalMain: {
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flex: 4
        // flex:1,
        // marginTop: height *0.05,
        // marginBottom: height * 0.05,
    },
    modalContent: {
        width: 'auto',
        justifyContent: 'center',

    },
    largeTextInput: {
        height: height * 0.08,
        width: width * 0.85,
        borderColor: 'rgb(185,185,185)',
        borderWidth: 1,
        borderRadius: 1,
        marginTop: 8,
        marginBottom: 8,
        fontSize: 18,
        paddingHorizontal: 15
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },



});

export default styleProfile