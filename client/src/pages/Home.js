import React,{useState} from 'react';
import {connect} from 'react-redux';
import styles from '../styles/Home.module.css';
import Paginate from '../components/paginate/paginate';
import Catalog from '../components/catalog/catalog';
import { getAnimesByGenre } from '../redux/animesDuck/animesDuck'

const Home = ({ANIME,NEWANIMES}) => {

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(32)

    const indexOfLastPage = currentPage * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPost = ANIME.animes.slice(indexOfFirstPage,indexOfLastPage)

    const pagination = (number) => setCurrentPage(number)

    return (
        <div className={styles.container}>
            {ANIME && ANIME.loadingAnimes ? (
                <div className={styles.contentCards}>
                    <Paginate 
                        anime={ANIME.animes.length} 
                        postPerPage={postPerPage} 
                        pagination={pagination}/>

                    <Catalog anime={currentPost}/>
                </div>
            ) : (
                <p>loading...</p>
            )}

            {ANIME && ANIME.loadingGenres ? (
                <div className={styles.contentGenres}>
                    {ANIME && ANIME.genres.length > 0 ? (
                        <ul className={styles.listGenres}>
                            {ANIME.genres.map((point,i) => {
                                return <li key={i} onClick={() => NEWANIMES(point.name)}>{point.name}</li>
                            })}
                        </ul>
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

const mapDispatchToProps = (dispatch) => {
    return {
        NEWANIMES: (nameGenre) => dispatch(getAnimesByGenre(nameGenre))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);