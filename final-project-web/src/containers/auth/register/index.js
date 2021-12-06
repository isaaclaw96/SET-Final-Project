import React, { useState } from "react";
import classes from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../../../components/navbar";
import axios from "axios";
import swal from "sweetalert";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token',res.data.token);
          localStorage.setItem('auth_name',res.data.username);
          localStorage.setItem('auth_id',res.data.id);
          localStorage.setItem('auth_email',res.data.email);
          localStorage.setItem('date',res.data.created);
          swal("Success", res.data.message, "success");
          navigate("/home");
        } else {
          setRegister({ ...register, error_list: res.data.validation_errors });
        }
      });
    });
  };
  return (
    <div>
      <NavBar />
      <div className={classes.register_section}>
        
        <h1>Register</h1>
        <form onSubmit={registerSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={register.name}
            placeholder="Name"
          />
          <span>{register.error_list.name}</span>

          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={handleInput}
            value={register.email}
            placeholder="Email"
          />
          <span>{register.error_list.email}</span>

          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleInput}
            value={register.password}
            placeholder="Password"
          />
          <span>{register.error_list.password}</span>

          <button type="submit">Sign Up!</button>

          <p> Already a user?{" "}<span><Link to="/"> Go to Login </Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
