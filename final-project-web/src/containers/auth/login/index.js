import React, {useState} from 'react';
import classes from "./login.module.css";
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import NavBar from '../../../components/navbar';
import Logo from '../../../assets/logo.png';


const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: "",
        error_list:[],
    })

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: login.email,
            password: login.password,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`api/login`, data).then((res) => {
                console.log(res);
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    localStorage.setItem('auth_id',res.data.id);
                    localStorage.setItem('auth_email',res.data.email);
                    localStorage.setItem('date',res.data.created);
                    swal("Success", res.data.message, "success");
                    navigate("/home");
                }
                else if(res.data.status === '401')
                {
                    swal("Warning", res.data.message, "warning");
                }
                else
                {
                    setLogin({...login, error_list: res.data.validation_errors });
                }
            });
        });
    }
    return(
        <div>
            <NavBar/>

                <div className={classes.login_section}>
                        

                        <div className={classes.image}>
                            <img src={Logo} alt="Logo" />
                        </div>
                        <h1 className={classes.text}>Login</h1>
                        <form onSubmit={loginSubmit}>
                            <label>Email:</label>
                            <input type="email" name="email" placeholder="Email" onChange={handleInput} value={login.email} />
                            <span>{login.error_list.email}</span>

                            <label>Password:</label>
                            <input type="password" name="password" placeholder="Password" onChange={handleInput} value={login.password} />
                            <span>{login.error_list.password}</span>

                            <button type="submit">Submit</button>

                            <p>No Account? <span><Link to="/register">Sign Up Now!</Link></span></p>
                        </form>
                </div>
                
        </div>
    )
}

export default Login;