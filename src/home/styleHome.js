import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleHome = StyleSheet.create({
    mainContainer: {
        width,
        height,
        backgroundColor: 'black'
    },
    cardContainer: {
        width,
        overflow: 'hidden',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    cardHeader: {
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    cardImage: {
        width,
        height: 275,
        resizeMode: 'cover'
    },
    caption: {
        padding: 5,
    },
    comments: {
        marginTop: 10,
        textAlign: 'center'
    }
});

export default styleHome