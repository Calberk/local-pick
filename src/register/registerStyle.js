import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const registerStyle = StyleSheet.create({
    mainContainer: {
        width,
        height,
        backgroundColor: '#fff'
    }
});

export default registerStyle;