import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const CustomButtonFour = ({onPress, text}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonContainer: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    text:{
        fontSize:20,
    },
}

export default CustomButtonFour;