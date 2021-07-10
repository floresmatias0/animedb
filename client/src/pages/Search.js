import React,{ useEffect } from 'react';
import { getAnimeByName } from '../redux/animesDuck/animesDuck';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Card from '../components/card/Card';
import styles from '../styles/Search.module.css'

const Search = ({RESULTS,resultAnime}) => {

    const {animeName} = useParams()

    useEffect(() => {
        resultAnime(animeName) 
        // eslint-disable-next-line    
    },[animeName])

    return (
        <div className={styles.container}>
            <h1>Hola soy un Resultado</h1>
            {RESULTS && RESULTS.search.length > 0 ? (
                <Card anime={RESULTS.search}/>
            ):(
                <p>loading...</p>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        RESULTS: state.animedb
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resultAnime: (name) => dispatch(getAnimeByName(name))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);