import React,{ useEffect } from 'react';
import { getAnimeDetails } from '../redux/animesDuck/animesDuck';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Card from '../components/card/Card';
import styles from '../styles/Search.module.css'

const Details = ({DETAILS,detailAnime}) => {
    const { animeId } = useParams();

    useEffect(() => {
        detailAnime(animeId) 
        // eslint-disable-next-line    
    },[animeId])

    return (
        <div className={styles.container}>
            <h1>Details</h1>
            {DETAILS && DETAILS.details.length > 0 ? (
                <Card anime={DETAILS.details} />
            ):(
                <p>loading...</p>
            )}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        DETAILS: state.animedb
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        detailAnime: (id) => dispatch(getAnimeDetails(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);