import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./home.css";

import axios from 'axios';

function Home(){
    var id = localStorage.getItem('auth_id');
    var name = localStorage.getItem('auth_name')
    var token = localStorage.getItem('auth_token');
    var email = localStorage.getItem('auth_email');
    const [data, setData] = useState([])
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(token !== ""){
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios.get(`api/countTask/${id}`).then((res)=>{
                    // console.log(res);
                    setData(res.data.category);
                    setCount(res.data.count);
                });
            });  
        }
        
    },[]);

    console.log(data);
    var d1 = new Date();

    return(
        <div>
            <NavBar />

            <div className="home">
            
            <h1>Welcome {name}</h1>
            
            <div className="details">
            <h3>Email: {email}</h3>

            <h4>Active Tasks: {count}</h4>
            </div>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Tasks</th>
                    <th>Date Created</th>
                    </tr>
                </thead>
                <tbody className="body">
                    
                    {data.map((list, index) => (
                        
                        <tr key={index}>
                            <td>{list.task_title}</td>   
                            <td>{list.created_at.substr(2,8)}</td>  
                        </tr>
                    ))
                    }
                                      


                </tbody>
                </Table>
            </div>
                

        </div>
    )    
}
export default Home;

// {
//                     data.map((list) => (
//                         <div>
//                             <table>
//                                 <tr>{list.task_title}</tr>
//                                 <tr>{list.created_at}</tr>
//                             </table>
//                         </div>
//                     ))
//                 }