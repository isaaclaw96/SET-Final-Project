import React from 'react'
import { View, TextInput } from 'react-native'

const CustomInputThree = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.customInput}>
            <TextInput  value={value} onChangeText={setValue} placeholder={placeholder} style={styles.textInput} secureTextEntry={secureTextEntry} />
        </View>
    )
}

const styles = {
    customInput: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        width: 250,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
}

export default CustomInputThree;