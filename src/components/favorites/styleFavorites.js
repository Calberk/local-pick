import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styleFavorites = StyleSheet.create({
    mainContainer: {
        width,
        height,
        backgroundColor: 'black'
    },
    textBox: {
        color: 'white',
        fontSize: 35
    },
});

export default styleFavorites