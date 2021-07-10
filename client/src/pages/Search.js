import React,{ useEffect } from 'react';
import { getAnimeByName } from '../redux/animesDuck/animesDuck';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Card from '../components/card/Card';

const Search = ({RESULTS,resultAnime}) => {

    const {animeName} = useParams()

    useEffect(() => {
        resultAnime(animeName) 
        // eslint-disable-next-line    
    },[animeName])

    return (
        <>
            <h1>Hola soy un Resultado</h1>
            {RESULTS && RESULTS.search.length > 0 ? (
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
                        anime={RESULTS.search}
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
        RESULTS: state.animedb
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resultAnime: (name) => dispatch(getAnimeByName(name))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);