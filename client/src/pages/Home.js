import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../styles/Home.module.css';

const Home = ({ANIME}) => {

    const popUp = (URL) => {
        window.open(URL, 'Trailer', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=400,left = 50,top = 50');
    }

    return (
        <div className={styles.container}>
            {ANIME && ANIME.loadingPopularities ? (
                <div className={styles.contentAll}>    
                    <div>
                        <h1 className={styles.titleAnime}>The most popular</h1>
                    </div>         
                    <div className={styles.contentCards}>    
                    {ANIME.popularities.map((point,i) => {
                        if(point.image && point.image.small){
                            return (
                                <div className={styles.card} key={i}>
                                    
                                    <Link to={`/details/${point.id}`}>
                                        <div className={styles.contentImage}>
                                            <img 
                                                src={`${point.image.small}`} 
                                                alt="poster" 
                                            />
                                            {point.name.length > 16 ? (
                                                <p className={styles.name}>{point.name.slice(0,17) + "..."}</p>
                                            ):(
                                                <p className={styles.name}>{point.name}</p>
                                            )}
                                           
                                        </div>
                                    </Link>
                                    {point.idYoutube ? (
                                        <p className={styles.trailer} onClick={() => popUp(`https://www.youtube.com/watch?v=${point.idYoutube}`)}>Trailer</p>
                                    ):(
                                        <p className={styles.trailer} onClick={() => alert("sorry no trailer")}>No Trailer</p>
                                    )}
                                </div>
                            )
                        }
                    })}
                    </div>
                </div>
            ) : (
                <p>loading...</p>
            )}

            {ANIME && ANIME.loadingGenres ? (
                <div className={styles.contentGenres}>
                    <h1 className={styles.titleAnime}>or filter by genre</h1>
                    {ANIME && ANIME.genres.length > 0 ? (
                        <div className={styles.listColumns}>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <Link className={styles.link} to={`/animes/${point.name}`}><li key={i} >{point.name}</li></Link>
                            }).slice(0,10)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <Link className={styles.link} to={`/animes/${point.name}`}><li key={i} >{point.name}</li></Link>
                            }).slice(10,20)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <Link className={styles.link} to={`/animes/${point.name}`}><li key={i} >{point.name}</li></Link>
                            }).slice(20,30)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <Link className={styles.link} to={`/animes/${point.name}`}><li key={i} >{point.name}</li></Link>
                            }).slice(30,40)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <Link className={styles.link} to={`/animes/${point.name}`}><li key={i} >{point.name}</li></Link>
                            }).slice(40,50)}
                        </ul>
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <Link className={styles.link} to={`/animes/${point.name}`}><li key={i} >{point.name}</li></Link>
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