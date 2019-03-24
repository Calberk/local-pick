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
    userCommentInfo: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 3,
        borderColor: '#fff',
        elevation: 15
    },
    commentHeader:{
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avatar: {
        // marginLeft: 10,
        width: 80, 
        height: 80,
        borderRadius: 40,
        borderColor: 'rgba(204,0,0, 0.8)',
        borderColor: '#fff',
        borderWidth: 1,
    },
    subAvatar: {
        // marginLeft: 10,
        width: 50, 
        height: 50,
        borderRadius: 25,
        borderColor: 'rgba(204,0,0, 0.8)',
        borderColor: '#fff',
        borderWidth: 1,
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
    comments: {
        width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    },
    commentSection:{
        width: '65%',
        flexDirection: 'row',
        marginLeft: 7,
        backgroundColor: 'blue'
    },
    subCommentSection:{
        width: '80%',
        flexDirection: 'row',
        marginLeft: 7,
        backgroundColor: 'blue'
    },
    userInfo: {
        // marginRight: 10,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    nameText:{
        fontSize: 28,
        fontFamily: 'openSans',
        color: '#fff',
        textAlign: 'center',

    },
    userText:{
        fontSize: 20,
        fontFamily: 'openSansB',
        color: '#fff',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
    },
    commentText:{
        fontSize: 16,
        fontFamily: 'openSansI',
        color: '#fff',
        textAlign: 'center',
        alignSelf:'center',
        justifyContent:'center',
    },
    subUserText:{
        fontSize: 20,
        fontFamily: 'openSansB',
        color: 'rgba(46, 49, 49, 1)',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
    },
    subCommentText:{
        fontSize: 16,
        fontFamily: 'openSansI',
        color: 'rgba(46, 49, 49, 0.8)',
        textAlign: 'center',
        alignSelf:'center',
        justifyContent:'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationText:{
        fontSize: 24,
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
        top: 0,
        marginRight: 10,
        marginTop: 15
    },
    editButton:{
        backgroundColor: 'transparent',
        elevation: 3
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
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    commentSubmit: {
        width, 
        // position: 'absolute',
        bottom: 0,
        backgroundColor:'orange'
    },
    // userComments: {
    //     width,
    //     height: 100,
    //     backgroundColor: 'blue'
    // },
    // commentMain: {

    // }



});

export default styleProfile