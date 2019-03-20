import {StyleSheet,Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleProfileList = StyleSheet.create({
    cardContainer: {
        width,
        // overflow: 'hidden',
        justifyContent: 'center',
        // alignItems: 'center',
        marginBottom: 5,
    },
    cardHeader: {
        // flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    },
    cardImage: {
        width: '85%',
        height: 225,
        resizeMode: 'cover',
        borderRadius: 5
    },
    titleText: {
        textAlign: 'center',
        // width: '45%',
        fontFamily: 'antonellie',
        fontSize: 22,
        elevation: 10,
        color: '#cc0000'
    },
    nameText: {
        textAlign: 'center',
        // width: '45%',
        fontFamily: 'openSansI',
        fontSize: 18,
        elevation: 10,
        color: '#fff'
    },
    comments: {
        marginTop: 10,
        textAlign: 'center'
    }, 
    imageContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    image:{
        height: '70%',
    },
    description: {
        width: '82%',
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    descriptionText: {
        // fontFamily: 'openSansBI',
        fontSize: 16,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flex:1,
        width: 'auto',
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end',
        // justifyContent: 'flex-end'
        // marginTop: 20
    },
    buttonCancel: {
        height: height * 0.07,
        width: '50%',
        // backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#cc0000',
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 15,
    },
    button: {
        height: height * 0.07,
        width: '50%',
        // backgroundColor: '#cc0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#cc0000',
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderBottomRightRadius: 15,
    },
    buttonText: {
        color: '#cc0000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardHeader: {
        // flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    },

});

export default styleProfileList