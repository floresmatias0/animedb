import React,{ useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Register = () => {

    const history = useHistory();

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
        })
    }

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
              if(user.data === "user create"){
                alert("great please login") 
                history.push("/login")  
              } 
            })
          .catch(err => console.log(err))
    }


    return (
        <div>
            <h1>Hola soy un register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type='text' 
                       onChange={handleChange}
                       name="name"
                       value={user.name}
                />

                <label>Lastname</label>
                <input type='text' 
                       onChange={handleChange}
                       name="lastname"
                       value={user.lastname}
                />

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

                <label>Confirm Password</label>
                <input type='password' 
                       onChange={handleChange}
                       name="password_virtual"
                       value={user.password_virtual}
                />

                <input type='submit' value="register"/>
            </form>
        </div>
    )      
}

export default Register;