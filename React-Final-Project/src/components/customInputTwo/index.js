import React,{ useState } from 'react'
import { View, TextInput } from 'react-native'



const CustomInputTwo = ({value, setValue, placeholder, secureTextEntry}) => {

    const [height, setHeight] = useState(0);

    return (
        <View style={[styles.containerInput,{height: Math.max(35,height)}]}>
            <TextInput showsVerticalScrollIndicator={false} multiline={true} onContentSizeChange={(event) =>  setHeight(event.nativeEvent.contentSize.height)} placeholderTextColor={'black'} value={value} onChangeText={setValue} placeholder={placeholder} style={[styles.textInput,{height: Math.max(35,height)}]} secureTextEntry={secureTextEntry} />
        </View>
    )
}


const styles={
    containerInput:{
        width:250,
    },
    textInput: {
        paddingHorizontal: 10,
        marginVertical: 5,
    }
}
export default CustomInputTwo;