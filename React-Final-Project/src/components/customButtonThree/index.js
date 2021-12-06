import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const CustomButtonThree = ({onPress, text}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonContainer: {
        margin: 20,
        // maxWidth: '100%',
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
    },
    text:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFF',
    },
}

export default CustomButtonThree;