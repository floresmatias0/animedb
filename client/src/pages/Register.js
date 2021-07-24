import React,{ useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import styles from '../styles/Register.module.css';

const Register = () => {

    const history = useHistory();

    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
        password_virtual:""
    })


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...user,
            [e.target.name]: e.target.value
            })
        );
    }

    const validate = (user) => {
        let errors = {};
        if (!user.name) {
            errors.name = 'name is required';
        } 
        // else if (!/\S+@\S+\.\S+/.test(user.name)) {
        //      errors.name = 'name is invalid';
        // }
        if (!user.lastname) {
            errors.lastname = 'lastname is required';
        } 
        // else if (!/\S+@\S+\.\S+/.test(user.lastname)) {
        //      errors.lastname = 'lastname is invalid';
        // }
        if (!user.email) {
            errors.email = 'email is required';
        } else if (!/\S+@\S+/.test(user.email)) {
             errors.email = 'email is invalid';
        }
        // if (user.password && user.password === 'invalid password') {
        //      errors.password = 'Password is required';
        // } else if (!/(?=.*[0-9])/.test(user.password)) {
        //      errors.password = 'Password is invalid';
        // }
        if (user.password && user.password_virtual && user.password !== user.password_virtual){
            errors.password_virtual = 'should match the previous password'
        }
        return errors;
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        let options = {
            method: 'POST',
            url: 'http://localhost:3001/users/new',
            header:{
                ContentType: 'application/json',   
            },
            data:{
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                password_virtual: user.password_virtual
            }
        }
          await axios.request(options)
          .then(user => {
              console.log(user.data)
              if(user.data === "user create"){
                alert("great please login") 
                history.push("/login")  
              } 
            })
          .catch(err => console.log(err))

    }


    return (
        <div className={styles.container}>
            <h1>Complete the form register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Name</label>
                <input type='text' 
                       onChange={handleChange}
                       name="name"
                       value={user.name}
                />
                {errors.name && errors.name === 'name is required'
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.name}</p> 
                ):(
                    <></>
                )}
                <label>Lastname</label>
                <input type='text' 
                       onChange={handleChange}
                       name="lastname"
                       value={user.lastname}
                />
                {errors.lastname && errors.lastname === 'lastname is required' 
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.lastname}</p> 
                ):(
                    <></>
                )}
                <label>Email</label>
                <input type='email' 
                       onChange={handleChange}
                       name="email"
                       value={user.email}
                />
                {errors.email && errors.email === 'email is required' || errors.email === 'email is invalid'
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

                <label>Confirm Password</label>
                <input type='password' 
                       onChange={handleChange}
                       name="password_virtual"
                       value={user.password_virtual}
                />
                {errors.password_virtual && errors.password_virtual === 'should match the previous password'
                ?(
                    <p className={`${styles.error} animate__animated animate__shakeX`}>{errors.password_virtual}</p> 
                ):(
                    <></>
                )}
                <button type='submit' className={styles.button}> Register </button>
            </form>
        </div>
    )      
}

export default Register;