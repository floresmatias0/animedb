import React,{useState} from 'react';
import { useHistory } from 'react-router';
import {connect} from 'react-redux';
import styles from '../styles/Home.module.css';

const Home = ({ANIME}) => {
    const history = useHistory();

    var newAnimes 

    const popUp = (URL) => {
        window.open(URL, 'Nombre de la ventana', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=400,left = 50,top = 50');
    }

    return (
        <div className={styles.container}>
            {ANIME && ANIME.loadingAnimes ? (
                <>
                <h1>Los mas populares</h1>
                <div className={styles.contentCards}>                  
                    {newAnimes = ANIME.animes.sort(function (a, b) {
                        if (a.popularity > b.popularity) {
                            return 1;
                        }
                        if (a.popularity < b.popularity) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                        }),
                        newAnimes.map((point,i) => {
                        if(point.image && point.image.small){
                            return (
                                <div className={styles.card} key={i}>
                                    <p>{point.popularity}</p>
                                    <div className={styles.contentImage}>
                                        <img 
                                            src={`${point.image.small}`} 
                                            alt="poster" onClick={() => 
                                            history.push(`/details/${point.id}`)}
                                        />
                                        <p className={styles.name}>{point.name}</p>
                                    </div>
                                    {point.idYoutube ? (
                                        <p className={styles.trailer} onClick={() => popUp(`https://www.youtube.com/watch?v=${point.idYoutube}`)}>Trailer</p>
                                    ):(
                                        <p className={styles.trailer} onClick={() => alert("sorry no trailer")}>No Trailer</p>
                                    )}
                                </div>
                            )
                        }
                    }).slice(0,32)}
                </div>
                </>
            ) : (
                <p>loading...</p>
            )}

            {ANIME && ANIME.loadingGenres ? (
                <div className={styles.contentGenres}>
                    {ANIME && ANIME.genres.length > 0 ? (
                        <div className={styles.listColumns}>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <li key={i} onClick={() => history.push(`/animes/${point.name}`)}>{point.name}</li>
                            }).slice(0,10)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <li key={i} onClick={() => history.push(`/animes/${point.name}`)}>{point.name}</li>
                            }).slice(10,20)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <li key={i} onClick={() => history.push(`/animes/${point.name}`)}>{point.name}</li>
                            }).slice(20,30)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <li key={i} onClick={() => history.push(`/animes/${point.name}`)}>{point.name}</li>
                            }).slice(30,40)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <li key={i} onClick={() => history.push(`/animes/${point.name}`)}>{point.name}</li>
                            }).slice(40,50)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <li key={i} onClick={() => history.push(`/animes/${point.name}`)}>{point.name}</li>
                            }).slice(50,60)}
                        </ul>
                        </div>
                    ):(
                        <p></p>
                    ) }
                </div>
            ) : (
                <p>loading...</p>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ANIME: state.animedb
    }
} 

export default connect(mapStateToProps)(Home);