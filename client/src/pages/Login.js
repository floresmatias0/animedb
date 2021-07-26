import React,{ useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import styles from '../styles/Login.module.css';
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2'

const Login = () => {

    const history = useHistory();

    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...user,
            [e.target.name]: e.target.value            
        }))
    }

    const validate = (user) => {
        let errors = {}
        if(!user.email){
            errors.email = "email is required"
        }
        if(!user.password){
            errors.password = "password is required"
        }
        return errors;
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.get('http://localhost:3001/users')
        .then(async(res) => {
            console.log(user)
            let users = res.data
            for(let i = 0; i < users.length; i++ ){
                if(users[i].email === user.email){
                    console.log(users[i].password)
                    console.log(user.password)
                const match = await bcrypt.compare(user.password,users[i].password);
                  console.log(match)
                  if(match) {
                      //login
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
                  }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Incorrect password try again'  
                      })
                  }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email not exist'  
                      })
                }
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
                {errors.email && errors.email === 'email is required'
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.email}</p> 
                ):(
                    <></>
                )}                

                <label>Password</label>
                <input type='password' 
                       onChange={handleChange}
                       name="password"
                       value={user.password}
                />
                {errors.password && errors.password === 'password is required' 
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.password}</p> 
                ):(
                    <></>
                )}
                <button type='submit' className={styles.button}> Login </button>
            </form>
        </div>
    )      
}

export default Login;