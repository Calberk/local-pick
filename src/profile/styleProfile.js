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
        // flexDirection: 'colu',
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    avatarContainer: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        // marginLeft: 10,
        width: 140, 
        height: 140,
        borderRadius: 70,
        borderColor: '#fff',
        borderWidth: 5
    },
    userInfo: {
        // marginRight: 10,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
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
        flex: 1,
    },
    modalHeader: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#cc0000',
    },
    modalMain: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        // marginTop: height *0.05,
        // marginBottom: height * 0.05,
        backgroundColor: '#fff',
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
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        height: height * 0.08,
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
    }


});

export default styleProfile