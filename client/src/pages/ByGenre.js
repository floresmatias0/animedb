import React,{ useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { getAnimesByGenre } from '../redux/animesDuck/animesDuck';
import Paginate from '../components/paginate/paginate';
import Catalog from '../components/catalog/catalog';

const ByGenre = ({NEWANIMES,GENRE}) => {

    const {nameGenre} = useParams();

    useEffect(() => {
        NEWANIMES(nameGenre)
    },[])

    //PAGINATION
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(32)

    const indexOfLastPage = currentPage * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPost = GENRE.animesByGenre.slice(indexOfFirstPage,indexOfLastPage)

    const pagination = (number) => setCurrentPage(number)


    return (
        <div>
            <h1>{nameGenre}</h1>
            {GENRE && GENRE.loadingAnimesByGenre ? (
                <>
                    <Paginate 
                    anime={GENRE.animesByGenre.length} 
                    postPerPage={postPerPage} 
                    pagination={pagination}/>

                    <Catalog anime={currentPost}/> 
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        GENRE: state.animedb
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        NEWANIMES: (nameGenre) => dispatch(getAnimesByGenre(nameGenre))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ByGenre);