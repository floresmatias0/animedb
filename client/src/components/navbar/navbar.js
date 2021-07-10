import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../../styles/Navbar.module.css';

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
                <h1 onClick={() => history.push("/")}>youAnime</h1>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.searchbar}>
                <div>
                    <label>search by name</label>
                </div>
                <div>
                    <input type='text' onChange={handleChange} name='name' value={search.name}/>
                    <input className={styles.button} type='submit' value="send"/>
                </div>
            </form>

            <div className={styles.user}>
                <h2>ingresar</h2>
            </div>

        </div>
    )
}


export default Navbar;