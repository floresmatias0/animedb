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
            <h1>Results finders</h1>
            {RESULTS && RESULTS.loadingSearch ? (
                <>
                {RESULTS && RESULTS.search === "Sorry we cant finder your anime" ? (
                    <p>Sorry we cant finder your anime</p>
                ):(
                    <Card anime={RESULTS.search}/>
                )}
                </>
            ):(
                <p>Loading..</p>
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