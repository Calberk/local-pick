import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleSearch = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainSection: {
        flex: 1
    },
    searchBar: {
        height: 60,
        width,
        borderColor: 'rgba(108, 122, 137, 0.8)',
        borderWidth: 1,
        flexWrap: 'wrap',
        // backgroundColor: '#fff',
        fontSize: 14,
        paddingHorizontal: 15,
    },
    searchBtn: {
        height: 60, 
        width: 80,
        right: 5, 
        position:'absolute',
        alignItems: 'center',
        color: 'rgba(108, 122, 137, 1)',
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'openSansB',
        zIndex: 5,

    },
    map: {
        flex: 4
    },
    infoContainer: {
        width: 250, 
        height: 150, 
        borderWidth: 0.5, 
        borderColor: '#dddddd', 
        borderRadius: 5, 
        marginTop: 10,
        // borderWidth: 0.5,
        // borderColor: '#cc0000'
    },
    infoHeader: {
        flex: 1,  
        width: '100%',
        backgroundColor: '#fff', 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#cc0000'
    },
    category: { 
        fontFamily: 'antonellie', 
        width: '100%',
        fontSize: 18, 
        color: '#b63838', 
        textAlign: 'center', 
        justifyContent: 'center',
    },
    name: { 
        fontSize: 15, 
        width: '100%',
        fontWeight: 'bold', 
        textAlign: 'center',
        justifyContent: 'center',
    },
    content: { 
        flex: 2, 
        fontSize: 11,
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    footer: { 
        flex: 2, 
        height: 30, 
        flexDirection: 'row', 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5, 
        backgroundColor: 'grey'
    },
    footerLeft: { 
        flex: 1,
        flexDirection: 'row',
        width: '50%', 
        height: '100%', 
        backgroundColor: '#fff', 
        borderBottomLeftRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
    },
    footerRight: { 
        flex: 1,
        flexDirection: 'row',
        width: '50%', 
        height: '100%', 
        backgroundColor: '#fff', 
        borderBottomRightRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
    }
});

export default styleSearch