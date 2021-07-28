import React,{ useEffect } from 'react';
import { getAnimeDetails } from '../redux/animesDuck/animesDuck';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Card from '../components/card/Card';
import styles from '../styles/Search.module.css'
import axios from 'axios';
import Swal from 'sweetalert2';

const Details = ({DETAILS,detailAnime}) => {
    const { animeId } = useParams();

    useEffect(() => {
        detailAnime(animeId) 
        // eslint-disable-next-line    
    },[animeId])

    const animeLike = async(a, b) => {
        let options = {
            method : 'POST',
            url: 'http://localhost:3001/animes/favorites',
            header:{
                ContentType: 'application/json',   
            },
            data:{
                idAnime: a,
                idUser: b
                }
          }
          await axios.request(options)
          await axios.get(`http://localhost:3001/users/${b}`)
            .then(newUser => {
                localStorage.removeItem("user")
                localStorage.setItem("user", JSON.stringify(newUser.data))
            })
          Swal.fire({
              icon: "success",
              text: "added to favorite"
          })
          window.location.reload()
    }

    // const refreshStorage = async(userId) => {
    //     await axios.get(`http://localhost:3001/animes/${userId}`)
    //     .then()
    // }

    return (
        <div className={styles.container}>
            <h1>Details</h1>
            {DETAILS && DETAILS.details.length > 0 ? (
                <>
                {localStorage.getItem("user") ? (
                    
                    <p onClick={() => animeLike(animeId,JSON.parse(localStorage.getItem("user")).id)}>like</p>
                ):(
                    <p></p>
                )}
                <Card anime={DETAILS.details} /> 
                </>
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
        detailAnime: (id) => dispatch(getAnimeDetails(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);