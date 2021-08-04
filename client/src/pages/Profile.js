import React, { useState } from 'react';
import {connect} from 'react-redux';
import noImage from '../assets/images/user.png';
import styles from '../styles/Profile.module.css';
import noMovie from '../assets/images/Noclapperboard.png';
import movie from '../assets/images/clapperboard.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = ({USER}) => {

    const { idUser } = useParams();

    const popUp = (URL) => {
        window.open(URL, 'Nombre de la ventana', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=400,left = 50,top = 50');
    }

    const [edit, setEdit] = useState(false);

    const [photo, setPhoto] = useState()
    const [newPhoto, setNewPhoto] = useState()
    const [loadingPhoto, setLoadingPhoto] = useState(false)
    

    const handleUpload = async () => {
        setLoadingPhoto(true)
        const formData = new FormData()
        formData.append("file",photo[0]);
        formData.append("upload_preset","itdlixpm");
        return await axios.post('https://api.cloudinary.com/v1_1/djnhaprmj/upload',formData)
        .then(image => {
            setNewPhoto(image.data.url)
            setLoadingPhoto(false)
        }).catch(err=> {
            console.log(err.message)
        })
    }

    return (
        <>
            {USER && USER.user.length > 0 ? (
                <div className={styles.container}>
                    <div className={styles.infoProfile}>
                    {USER.user.map((point,i) => {
                        return (
                            <div className={styles.cardProfile} key={i}>
                                <h1>welcome {point.name}</h1>
                                <div className={styles.contentImage}>
                                    <img src={point.image ? point.image : noImage} 
                                        alt="imageProfile"/>
                                    <p onClick={() => setEdit(true ? true : false)}>editar</p>
                                    <div className={edit ? styles.edit : styles.editHidden}>
                                    <h3>upload photo</h3>
                                        <input type="file" className={styles.inputFile} onChange={(e)=>setPhoto(e.target.files)}/>
                                        {loadingPhoto ?(
                                            // <img className={styles.loadingPhotoImg} src={pikachu} alt="loading..."/>
                                            <p>loading...</p>
                                        ):(
                                            <button 
                                            className={styles.button} 
                                            onClick={handleUpload}>upload photo</button>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.contentInfo}>
                                    <p>{point.email}</p>
                                </div>
                            </div> 
                        )
                    })}
                    </div>
                    <div className={styles.infoFavs}>
                        <h2>Favorites</h2>
                    {USER.user[0].animes && USER.user[0].animes.length > 0 ? (
                        <div className={styles.contentFavs}>
                            {USER.user[0].animes.map((elem,i)=>{
                                console.log(elem)
                                    return (
                                        <div className={styles.card} key={i}> 
                                            <p className={styles.title}>{elem.name.length > 20 ? elem.name.slice(0,20) + "..." : elem.name}</p>
                                            <Link to={`/details/${elem.id}`}>
                                                <img src={elem.image ? elem.image.small : noMovie} alt='poster' width="200px"/>
                                            </Link>
                                            {elem.idYoutube ? (
                                                <p className={styles.trailer} 
                                                onClick={() => popUp(`https://www.youtube.com/watch?v=${elem.idYoutube}`)}>
                                                    Trailer
                                                <img src={movie} alt="movieIcon"/>
                                                </p>
                                            ):(
                                                <p className={styles.notrailer} 
                                                onClick={() => alert("sorry no trailer")}>
                                                <img src={noMovie} alt="movieIcon"/>    
                                                </p>
                                            )}
                                        </div>                  
                                    )  
                            })}  
                        </div>
                        
                    ):(
                        <></>
                    )}
                    </div>
                </div>
            ):(
               <></> 
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        USER: state.animedb
    }
}

export default connect(mapStateToProps)(Profile);