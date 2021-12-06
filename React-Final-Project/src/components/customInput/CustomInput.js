import React from 'react'
import { View, TextInput } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.customInput}>
            <TextInput  value={value} onChangeText={setValue} placeholder={placeholder} style={styles.textInput} secureTextEntry={secureTextEntry} />
        </View>
    )
}


const styles={
    customInput: {
        backgroundColor: 'white',
        width: '100%',
        
        borderColor:'#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    textInput: {
        padding: 10,
        // borderRadius: 20, 
    }
}
export default CustomInput;
