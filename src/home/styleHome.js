import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleHome = StyleSheet.create({
    content: {
        flex: 1,                       
        justifyContent: 'center',           
        alignItems: 'center',               
    },
    header: {
        width,
        margin: 10,                         
        color: '#FFFFFF',                   
        // fontFamily: 'Avenir',               
        fontSize: 26,        
        textAlign: 'center',               
    },
    text: {
        width,
        marginHorizontal: 20,               
        color: 'rgba(255, 255, 255, 0.75)', 
        textAlign: 'center',                
        // fontFamily: 'Avenir',
        fontSize: 18,
        marginBottom: 150
    },
    mainContainer: {
        width,
        height,
        backgroundColor: 'black'
    },
    cardContainer: {
        width,
        overflow: 'hidden',
        justifyContent: 'space-between',
        marginBottom: 1,
        borderBottomWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'black'
    },
    cardHeader: {
        width,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    cardImage: {
        width,
        height: 275,
        resizeMode: 'cover',
        backgroundColor: 'orange'
    },
    caption: {
        padding: 5,
    },
    comments: {
        marginTop: 10,
        textAlign: 'center'
    }, 
    modalContainer: {
        // flex: 1,
        // height:'100%',
        // justifyContent: 'space-evenly'
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
        fontFamily: 'openSans',
        fontSize: 16,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    modalMain: {
        // justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        flex: 5,
        // flex:1,
        // marginTop: height *0.05,
        // marginBottom: height * 0.05,
    },
    modalContent: {
        flex: 3,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',

    },
    largeTextInput: {
        height: height * 0.08,
        width: width * 0.85,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderRadius: 5,
        marginTop: 30,
        // marginLeft: 5,
        // marginRight: 5,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
        elevation: 5,

    },
    buttonContainer: {
        flex:1,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonCancel: {
        height: height * 0.07,
        width: '45%',
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 30,
        elevation: 5
    },
    button: {
        height: height * 0.07,
        width: '45%',
        backgroundColor: '#cc0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 30,
        elevation: 5
    },
    cancelText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    locationInput: {
        height: height * 0.08,
        width: width * 0.85,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderRadius: 5,
        marginTop: 30,
        paddingHorizontal: 15,
        fontSize: 18,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
        elevation: 5
    },
    locationInputWithPredictions: {
        height: height * 0.08,
        width: width * 0.85,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingHorizontal: 15,
        marginTop: 30,
        fontSize: 18,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
        elevation: 5
    },
    suggestions: {
        width: width * 0.85,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        fontSize: 16,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 0,
        borderColor: 'darkgrey',
        elevation: 5,
    },
    suggestionsRoundedBottom: {
        width: width * 0.85,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        fontSize: 16,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: 'darkgrey',
        elevation: 5
    },
    titleText: {
        textAlign: 'center',
        width,
        fontFamily: 'antonellie',
        fontSize: 22,
        elevation: 10,
        color: '#cc0000',
    },
    nameText: {
        textAlign: 'center',
        width,
        fontFamily: 'openSansI',
        fontSize: 18,
        elevation: 10,
        color: '#fff',
    },
    authorContainer: {
        position: 'absolute',
        right: 0,
        top: '40%',
        marginRight: 10,

    },
    author: {
        textAlign: 'center',
        fontFamily: 'openSansB',
        fontSize: 15,
        color: 'rgba(108, 122, 137, 1)',
        paddingLeft: 5
        // borderBottomWidth: 1,
        // borderColor: 'rgba(108, 122, 137, 1)'
    }
});

export default styleHome