import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, Button, ScrollView, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../../assets/logo.png';
import CustomInput from '../../components/customInput/CustomInput';
import CustomButton from "../../components/customButton/CustomButton";
import { loginUser } from "../../actions";


function Login({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const login = useSelector(state => state.login);

    useEffect(() => {
        if(login.data.token){
            navigation.navigate("Home");
        }
        else{
            navigation.navigate("Login");
        }
    });

    const onSignInPressed = () => {
        const data = {
            email: email,
            password: password,
        }
        // if(!email || !password ){
        //     alert("Please Fill in all fields!");
        // }
        // else{
        //    dispatch(loginUser(data)); 
        // }
        dispatch(loginUser(data));
        setEmail('');
        setPassword('');
    }
    var display_errors = [];
    if(login.data.validation_errors){
        display_errors=[
            login.data.validation_errors
        ]
    };

    var invalid_credentials = [];
    if(login.data.status == 401){
        invalid_credentials=[login.data.message]
    }
    return(
        
        <SafeAreaView style={styles.loginContainer}> 
            <Image source={Logo} style={styles.logo} resizeMode="contain" alt=""/>
            
            {
                display_errors.map((item,index) => 
                (
                <View  key={index}>
                    <Text style={styles.errors}>{item.email}</Text>
                    <Text style={styles.errors}>{item.password}</Text>
                </View>
                    
                ))
            }
            {
                invalid_credentials.map((item,index) => 
                (
                <View key={index}>
                    <Text style={styles.errors}>{item}</Text>
                </View>
                    
                ))
            }
            {/*<FlatList
            data={display_errors}
            renderItem={({item})=>(
                <View>
                    <Text>{item.email}</Text>
                    <Text>{item.password}</Text>
                </View>
            )}
            />*/}
            <Text style={styles.headerText}>Login</Text>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} />

            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>  

            <CustomButton onPress={onSignInPressed} text="Sign in"/>

            <Text>Not a User? </Text>
        
            <CustomButton onPress={() => navigation.navigate("Register")} text="Register Now!" type="SECONDARY"/>

        </SafeAreaView>
    );
}

const styles={
    logo: {
        width: 200,
        maxWidth: 500,
        height:200,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 20,
    },
    loginContainer: {
        width: '100%',
        padding: 50,
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#F5F5DC',
    },
    errors: {
        color: 'red',
    },
}

export default Login;