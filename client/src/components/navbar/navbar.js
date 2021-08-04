import React, { useState } from 'react';
import { useHistory} from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../../styles/Navbar.module.css';
import noImage from '../../assets/images/user.png';
import axios from 'axios';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/animesDuck/animesDuck';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';


const Navbar = ({USERS,REMOVEUSER}) => {

    const history = useHistory()
    const [search, setSearch] = useState({
        name: ""
    })

    const handleChange = (e) => {
        setSearch({
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        if(!search.name){
            e.preventDefault()
            Swal.fire({
                icon: "error",
                text: "please insert name to search"
            })
        }else{
           history.push(`/results/${search.name}`) 
        }
        
    }

    const logOut = () => {
        axios.get("http://localhost:3001/users/logout")
        if(localStorage.getItem("user")){
           localStorage.removeItem("user") 
        }
        REMOVEUSER()
        window.location.reload()
    }

    const loginWithSweetAlert = () => {
        Swal.fire({
            title: 'Login',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Email">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: async() => {
              const login = Swal.getPopup().querySelector('#login').value
              const password = Swal.getPopup().querySelector('#password').value
                if (!login || !password) {
                    Swal.showValidationMessage(`Please enter email and password`)
                }
                return { login: login, password: password }
            }
          }).then(async(result) => {
              if(result.isConfirmed){                 
                await axios.get('http://localhost:3001/users')
                .then(async(res) => {
                    console.log(res.data)
                    let users = res.data
                    for(let i = 0; i < users.length; i++ ){
                            if(users[i].email === result.value.login){
                            const match = await bcrypt.compare(result.value.password,users[i].password);
                            if(match) {
                                let options = {
                                    method: 'POST',
                                    url: 'http://localhost:3001/users/login',
                                    header:{
                                        ContentType: 'application/json',   
                                    },
                                    data:{
                                        email: result.value.login,
                                        password: result.value.password
                                        }
                                }
                                await axios.request(options)
                                .then(user => {
                                    if(user.data){
                                        localStorage.setItem("user",JSON.stringify(user.data));
                                    }else{
                                        console.log("error")
                                    }
                                    })
                                .catch(err => console.log(err))

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Great!.',
                                    text: 'login successfully'  ,
                                    confirmButtonText: 'Cool',
                                    focusConfirm: false,
                                }).then((result) => {
                                    console.log(result)
                                    if(result.isConfirmed || result.isDismissed){
                                        window.location.reload();
                                    }
                                })

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
        })
    }

    return(
        <div className={styles.container}>

            <div className={styles.title}>
                <Link to="/" className={styles.animeTitle}>youAnime</Link> 
            </div>
            
            <form onSubmit={handleSubmit} className={styles.searchbar}>
                <div>
                    <label>search by name</label>
                </div>
                <div>
                    <input className={styles.barSearch} type='text' onChange={handleChange} name='name' value={search.name}/>
                    <input className={styles.button} type='submit' value="send"/>
                </div>
            </form>

            <div className={styles.user}>
                {USERS && USERS.user.length > 0 ? (
                    <div className={styles.buttonsLogout}>
                        <h3 onClick={() => logOut()}>Logout</h3>
                        <img 
                            src={USERS.user[0].image} 
                            alt="imageProfile" 
                            onClick={() => history.push("/profile")}
                        /> 
                    </div>
                ):(
                    <div className={styles.buttonsLogin}>
                        <p onClick={()=> loginWithSweetAlert()}> ingresar</p>
                        {/* <Link to="/login">ingresar</Link> */}
                        <Link to="/register">registrarse</Link>
                        <img src={noImage} alt="userIcon" onClick={() => history.push(`/profile/${JSON.parse(localStorage.getItem('user')).id}`)}/> 
                    </div>
                )}
                
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        USERS: state.animedb
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        REMOVEUSER: () => dispatch(removeUser())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);