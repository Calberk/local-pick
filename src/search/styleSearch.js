import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleSearch = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
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
        backgroundColor: '#fff',
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
});

export default styleSearch