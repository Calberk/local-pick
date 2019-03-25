import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const InputComponent = (props) => {
    let template = null; 
    switch(props.type){
        case "textinput":
            template =
            <TextInput
                {...props}
                style={[styles.input, props.overrideStyle]}
            />
        break;
        default: 
            return template
    }
    return template
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        borderWidth: 3,
        borderRadius: 25,
        borderColor: 'grey',
        fontSize: 18,
        padding: 5,
        marginTop: 10
    }
})

export default InputComponent