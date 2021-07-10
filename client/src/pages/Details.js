import React,{ useEffect } from 'react';
import { getAnimeDetails } from '../redux/animesDuck/animesDuck';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Card from '../components/card/Card';

const Details = ({DETAILS,detailAnime}) => {
    const { animeId } = useParams();

    useEffect(() => {
        detailAnime(animeId) 
        // eslint-disable-next-line    
    },[animeId])

    return (
        <>
            <h1>Hola soy un Detail</h1>
            {DETAILS && DETAILS.details.length > 0 ? (
                <div>
                    {/* {RESULTS.search.map((anime,i) => {
                        return (
                            <div key={i}>
                                <p>{anime.name}</p>
                                <p>{anime.description}</p>
                                <img src={anime.image.small} alt="Poster"/>
                            </div>
                        )
                    })} */}
                <Card
                    anime={DETAILS.details}
                    error={DETAILS.errorDetails}
                />
                </div>
            ):(
                <p>loading...</p>
            )}

        </>
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