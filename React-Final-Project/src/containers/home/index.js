import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, RefreshControl, KeyboardAvoidingView, Platform, TextInput} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../actions';
import { SafeAreaView } from 'react-native-safe-area-context';

import CardHolder from '../../components/cards';
import CustomInput from '../../components/customInput/CustomInput'; 
import CustomButton from '../../components/customButton/CustomButton';
import { createTask } from '../../actions';
import ViewList from '../../components/viewList';


import axios from 'axios';
import CustomButtonTwo from '../../components/customButtonTwo';
import CustomButtonThree from '../../components/customButtonThree';
import CustomInputThree from '../../components/customInputThree';
import CustomButtonFour from '../../components/customButtonFour';


const Home = ({navigation}) => {
    
    const [tasks, setTasks] = useState('');
    const [error, setError] = useState({});
    const [taskList, setTaskList] = useState([]);
    const [count, setCount] = useState(0);
    const [category,setCategory] = useState(0);

    const [refresh, setRefresh] = useState(false);
    
    
    const login = useSelector(state => state.login);
    const task = useSelector(state => state.task);
    const dispatch = useDispatch();
    
    const id = login.data.id;
    
    useEffect(() => {
        if(login.data.token){
            navigation.navigate("Home");
            
            axios.get(`http://9908-49-124-200-218.ngrok.io/api/countTask/${id}`).then(res=>{
                setCount(res.data.count);
            });
        }
        else{
            alert("Logged Out!");
            navigation.navigate("Login");
        }
    });


    useEffect(() => {
            axios.get(`http://9908-49-124-200-218.ngrok.io/api/viewtask/${id}`).then(res=>{
                if(res.status === 200)
                {
                    setTaskList(res.data.category)
                }
            });
            
    },[category]);

    function retrieveAPI(){
        axios.get(`http://9908-49-124-200-218.ngrok.io/api/viewtask/${id}`).then(res=>{
                if(res.status === 200)
                {
                    setTaskList(res.data.category)
                }
            });
    }

    const onAddTaskPressed = (e) => {

        const data = {
            task: tasks,
            id: id,
        };
        axios.post(`http://9908-49-124-200-218.ngrok.io/api/createtask/${id}`, data).then(res=>{
            if(res.data.status === 200){
                 alert("Data successfully added!");
                setCategory(+1);
            }
            else if(res.data.status === 400){
                setError({...error, error_list:res.data.errors});
            }
        });
        setTasks('');
        
    };

    var display_errors = [];
    if(error.error_list)
    {
        display_errors = [
            error.error_list.task,
        ]
    }

    const onLogOutPressed = () => {
        dispatch(logoutUser());
    };
    function onRefresh(){
        console.log("APP IS LOADING");
        setRefresh(true);
        setTimeout(() => {
          setRefresh(false)
        },2000);
      }

    return (
        
        <ScrollView style={styles.homeContainer}>  

            <View style={styles.tasksWrapper}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome {login.data.username}!</Text>
                    <CustomButtonThree onPress={onLogOutPressed} text="LogOut"/>
                </View>

                <View style={styles.cardHolder}>
                    <CardHolder text="Pending Task: " data={count}/>
                </View>
                {/* Write a Task Section */}
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTask}
                >   
                    <CustomInputThree placeholder="Write a task" value={tasks} setValue={setTasks} />
                    {/*<TextInput style={styles.input} placeholder="Write a task" value={tasks} setValue={setTasks}/>*/}
                
                    {/*<TouchableOpacity onPress={onAddTaskPressed}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.plusText}>+</Text>
                        </View>
                    </TouchableOpacity>*/}
                    <CustomButtonFour text="+" onPress={onAddTaskPressed}/>
                </KeyboardAvoidingView>

                <View style={styles.itemHolder}>
                    {/* This is where the task will go  */}

                    {
                        taskList.map((item, index) => {
                            return <ViewList key={index} data={item} retrieveAPI={retrieveAPI} />
                        })
                    }
                    {/*<FlatList
                    data={taskList}
                    renderItem={({item}) => (

                        <ViewList data={item} retrieveAPI={retrieveAPI} />
                        
                    )}
                    initialNumToRender={taskList.length}
                    />*/}
                </View>
            </View>
            
            

            {/*<View style={styles.addData}>
                    <Text style={styles.addText}>Add Job</Text>
                    <FlatList
                    data={display_errors}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item}</Text>
                        </View>
                    )} 
                    />
                
                <CustomInput placeholder="Write a task" value={tasks} setValue={setTasks} />
                <CustomButton text="Add Task" onPress={onAddTaskPressed}/>
                </View>*/}

            
        </ScrollView>  
        
        
    )
}

const styles= {
    homeContainer:{
        flex: 1,
        backgroundColor: '#F5F5DC',
    },
    tasksWrapper:{
        paddingTop: 50,
        paddingHorizontal:20,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',   
    },
    welcomeText:{
        padding: 10,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    cardHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    addData: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    addText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemsHolder:{
        marginTop:30,
    },
    writeTask:{
        // position: 'absolute',
        // bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input:{
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        width: 250,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    plusText:{
        fontSize:20,
    },
    
    
}

export default Home;
