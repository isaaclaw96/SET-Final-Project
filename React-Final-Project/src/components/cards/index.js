import React from 'react'
import { View, Text } from 'react-native'

const CardHolder = ({text, data}) => {
    return (
        <View style={styles.card}>
            <Text>{text}</Text>
            <Text>{data}</Text>
        </View>
    )
}

const styles = {
    card: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        border: '5px solid black',
    }
}

export default CardHolder;
