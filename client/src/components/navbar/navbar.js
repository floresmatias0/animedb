import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../../styles/Navbar.module.css';
import user from '../../assets/images/user.png';

const Navbar = () => {

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

    return(
        <div className={styles.container}>

            <div className={styles.title}>
                <h1 onClick={() => history.push("/")}>youAnime {/*<img src={revenge} alt="titleIcon" width="30px"/>*/}</h1>
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
                <img src={user} alt="userIcon"/>
            </div>

        </div>
    )
}


export default Navbar;