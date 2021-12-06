import React, {useState, useEffect} from 'react'
import { View, Text, RefreshControl, ScrollView, TouchableOpacity} from 'react-native'

import CustomInputTwo from '../customInputTwo';
import CustomButtonTwo from '../customButtonTwo';
import CustomButtonThree from '../customButtonThree';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewList = ({data, retrieveAPI}) => {
    // const user_id = data.user_id;
    const [edit, setEdit] = useState(data.task_title);
    const id = data.id;
    const [error, setError] = useState({});
    const [render, setRender] = useState(0);
    const [storage, setStorage] = useState(0);
    const [status, setStatus] = useState(data.status);
    

    useEffect(() => {
        retrieveAPI(retrieveAPI);
        setStorage(+1)
    }, [render]);
    const onEditPressed = (e) => {
        const input = {
            edit:edit,
        }
        axios.put(`http://9908-49-124-200-218.ngrok.io/api/updateTask/${id}`,input).then(res => {
            if(res.data.status === 200)
            {
                alert("Update Success",res.data.message);

            }
            else if(res.data.status === 422)
            {
                setError(...res.data.errors.edit);
                alert(...res.data.errors.edit);
            }
            else if(res.data.status === 404)
            {
                alert("Error", res.data.message);
            }
        });
    
    }

    const onDeletePressed = (e) => {
        axios.put(`http://9908-49-124-200-218.ngrok.io/api/deleteTask/${id}`).then(res => {
            if(res.data.status === 200)
            {
               alert("Delete Successfully!", res.data.message); 
               setRender(+1);
               setStatus(0);
            }
            else
            {
                alert("Deleting Error!");
            }

            // window.location.reload(true);
        })
    }
    return (
        
            <View style={data.status === 1 ? styles.taskView : styles.hiddenView}>
                <View style={styles.itemLeft}>
                    {/*<TouchableOpacity style={styles.square}></TouchableOpacity>*/}
                    <CustomInputTwo placeholder={data.task_title} value={edit} setValue={setEdit}/> 
                </View>

                <View>
                    <CustomButtonTwo text='Edit' onPress={onEditPressed} type="PRIMARY"/>
                    <CustomButtonTwo text="Delete" onPress={onDeletePressed} type="SECONDARY" />
                </View>
            </View>
        
        
    )
}

const styles ={
    taskView:{
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 10,       
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        // flexWrap: 'wrap',

    },
    square:{
        width:24,
        height:24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    hiddenView:{
        display:'none',
    },
}
export default ViewList;

