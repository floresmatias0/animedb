import React,{ useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import styles from '../styles/Login.module.css';

const Login = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let options = {
            method: 'POST',
            url: 'http://localhost:3001/users/login',
            header:{
                ContentType: 'application/json',   
            },
            data:{
                email: user.email,
                password: user.password
                }
          }
          await axios.request(options)
          .then(user => {
              if(user.data){
                  localStorage.setItem("user",JSON.stringify(user.data))
                  history.push("/")
                  window.location.reload()
              }else{
                    console.log("error")
              }
            })
          .catch(err => console.log(err))
    }

    return (
        <div className={styles.container}>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Email</label>
                <input type='email' 
                       onChange={handleChange}
                       name="email"
                       value={user.email}
                />

                <label>Password</label>
                <input type='password' 
                       onChange={handleChange}
                       name="password"
                       value={user.password}
                />

                <button type='submit' className={styles.button}> Login </button>
            </form>
        </div>
    )      
}

export default Login;