import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import classes from "./navbar.module.css";
import { useNavigate } from 'react-router';

function NavBar(){

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_id');
                localStorage.removeItem('auth_email');
                localStorage.removeItem('date');
                swal("Success",res.data.message,"success");
                navigate("/");
            }
        })
    }
    
    var AuthButtons = '';
    if(!localStorage.getItem('auth_token'))
    {
        AuthButtons = (

            <>
                    <Link className={classes.nav_section}to="/">Login</Link>
          
                    <Link className={classes.nav_section} to="/register">Register</Link>

            </>
        );
    }
    else
    {
        AuthButtons = (

            <>
            <Link className={classes.nav_section} to="/home">Home</Link> 
            <button type='button' onClick={logoutSubmit} className={classes.nav_section_logout}>Logout</button>
            </>
         
        );
    }
    return(
        <nav>
            <div className={classes.top_section}>
                
                {AuthButtons} 
                
            </div>
        </nav>
    )
}

export default NavBar;