import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, Button, ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/customButton/CustomButton';
import CustomInput from '../../components/customInput/CustomInput';

import {registerUser} from "../../actions";
import {clearRegister} from "../../actions";

function Register({navigation}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const register = useSelector(state => state.register);
    // const [token,setToken] = useState(register.data.token);
    const [count,setCount] = useState(0);

    // useEffect(() => {
    //     if(register.data.token !== ""){
    //         dispatch(clearRegister());
    //         navigation.navigate("Login");
    //     }
    //     else if(register.error_list){
    //         navigation.navigate("Register");
    //     }
    // });
    
    const onRegisterPressed = () => {

        const data = {
            name: name,
            email: email,
            password: password,
        }
        // if(!name || !email || !password ){
        //     alert("Please Fill in all fields!");
        // }
        // else{
        //    dispatch(registerUser(data)); 
        // }
        
        dispatch(registerUser(data)); 
        setCount(+1);
        
        setName('');
        setEmail('');
        setPassword('');
        // dispatch(clearRegister());
    }
    
    var display_errors = [];
    if(register.error_list){
        display_errors=[
            register.error_list
        ]
    };
    return(
        
        <SafeAreaView style={styles.registerContainer}>
            <Text style={styles.headerText}>Register</Text>

            {
                display_errors.map((item,index) => 
                (
                <View key={index}>
                    <Text style={styles.errors}>{item.name}</Text>
                    <Text style={styles.errors}>{item.email}</Text>
                    <Text style={styles.errors}>{item.password}</Text>
                </View>
                    
                ))
            }

            <CustomInput placeholder="Name" value={name} setValue={setName} />
            
            
            
            
            <CustomInput placeholder="Email" value={email} setValue={setEmail} />
            
            

            
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
        
            


            <CustomButton onPress={onRegisterPressed} text="Register" type="SECONDARY"/>
            <Text>Already a User? </Text>
            <CustomButton onPress={()=> navigation.navigate("Login")} text="Login Now!"/>
            

        </SafeAreaView>
        
    );
}

const styles = {
    headerText:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    registerContainer: {
        padding: 50,
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
    },
    inputStyle: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        width: "60%",
        margin: 20,
    },
    buttonStyle: {
        backgroundColor: 'lightgray',
        padding: 15,
        margin: 20,
        borderRadius: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    errors: {
        color: 'red',
    }
}

export default Register;