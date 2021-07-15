import React from 'react';
import styles from '../../styles/Catalog.module.css';
import { Link } from 'react-router-dom';
import movie from '../../assets/images/clapperboard.png';
import noMovie from '../../assets/images/Noclapperboard.png';

const Catalog = (props) => {

    const popUp = (URL) => {
        window.open(URL, 'Nombre de la ventana', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=400,left = 50,top = 50');
    }

    return (
        <div className={styles.container}>
        {props.anime.map((elem,i)=>{
                return (
                    <div className={styles.card} key={i}> 
                        <Link to={`/details/${elem.id}`}>
                            <img src={elem.image.tiny} alt='poster'/>
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
        })   
        }       
        </div>
    )
}

export default Catalog;