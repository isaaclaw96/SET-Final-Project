import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const CustomButtonTwo = ({onPress, text,type="PRIMARY"}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, styles[`container_${type}`]]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonContainer: {
        padding: 5,
        marginBottom: 5,
        borderRadius: 10,
        textAlign: 'center',
        borderColor: '#C0C0C0',
        borderWidth:1
    },
    text:{
        fontSize: 15,
    },
    container_PRIMARY:{
        backgroundColor: '#FFF',
    },
    container_SECONDARY:{
        backgroundColor: 'red',
        
    }
}

export default CustomButtonTwo;