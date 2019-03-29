import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

const InputField = ({placeholder, keyboardType, meta: {error, touched}, name, value, secureTextEntry, input: {onChange, ...restInput}, autoCapitalize, customStyles}) => {
    return(
        <View>
            <View style={styles.inputContainer}>
            <TextInput
                style={customStyles}
                keyboardType={keyboardType}
                placeholder={placeholder}
                name={name}
                secureTextEntry={secureTextEntry}
                placeholderTextColor='#555555'
                onChangeText={onChange}
                autoCapitalize={autoCapitalize}
                value={value}
                {...restInput}
                />
            </View>
            {touched && (error && <Text style={{color: '#cc0000'}}>{error}</Text>)}
        </View>
        

    )
}

const styles = StyleSheet.create({
    topRegisterContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})

export default InputField