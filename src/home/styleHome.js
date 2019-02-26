import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleHome = StyleSheet.create({
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
});

export default styleHome