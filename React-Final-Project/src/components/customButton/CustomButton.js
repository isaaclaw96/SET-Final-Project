import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const CustomButton = ({onPress, text, type="PRIMARY"}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, styles[`container_${type}`]]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonContainer: {
        width: '100%',

        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',  
    },
    text:{
        fontWeight: 'bold',
        color: 'white',
    },
    container_PRIMARY:{
        backgroundColor: '#3B71F3',
    },
    container_SECONDARY:{
        backgroundColor: 'gray',
    }
}

export default CustomButton
