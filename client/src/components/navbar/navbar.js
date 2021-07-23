import React, { useState } from 'react';
import { useHistory} from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../../styles/Navbar.module.css';
import user from '../../assets/images/user.png';
import axios from 'axios';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/animesDuck/animesDuck'

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

    const handleSubmit = () => {
        history.push(`/results/${search.name}`)
    }

    const logOut = () => {
        axios.get("http://localhost:3001/users/logout")
        if(localStorage.getItem("user")){
           localStorage.removeItem("user") 
        }
        REMOVEUSER()
        window.location.reload()
    }

    return(
        <div className={styles.container}>

            <div className={styles.title}>
                <h1 onClick={() => history.push("/")}>youAnime {/*<img src={revenge} alt="titleIcon" width="30px"/>*/}</h1>
            </div>
            
            <form onSubmit={handleSubmit} clasuserRegitersName={styles.searchbar}>
                
                    <label>search by name</label>
                
                <div>
                    <input className={styles.barSearch} type='text' onChange={handleChange} name='name' value={search.name}/>
                    <input className={styles.button} type='submit' value="send"/>
                </div>
            </form>

            <div className={styles.user}>
                {USERS && USERS.user.length > 0 ? (
                    <h3 onClick={() => logOut()}>Logout</h3>
                ):(
                    <>
                        <Link to="/login">ingresar</Link>
                        <Link to="/register">registrarse</Link>
                    </>
                )}
                <img src={user} alt="userIcon"/>
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