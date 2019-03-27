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
        width: 200, 
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
        backgroundColor: '#cc0000', 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#cc0000'
    },
    category: { 
        fontFamily: 'antonellie', 
        width: '100%',
        fontSize: 18, 
        color: '#fff', 
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
        height: '30%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 6
    },
    footerInfo: { 
        flexDirection: 'row',
        width: '80%', 
        borderBottomLeftRadius: 5, 
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

export default styleSearch