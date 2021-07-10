import React from 'react';
import styles from '../../styles/Catalog.module.css';
import { useHistory } from 'react-router';

const Catalog = (props) => {

    const history = useHistory();

    const popUp = (URL) => {
        window.open(URL, 'Nombre de la ventana', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=400,left = 50,top = 50');
    }

    return (
        <div className={styles.container}>
        {props.anime.map((elem,i)=>{
                return (
                    <div className={styles.card} key={i}> 
                        <img src={elem.image.tiny} alt='poster' onClick={() => history.push(`/details/${elem.id}`)}/>
                        {elem.idYoutube ? (
                            <p className={styles.trailer} onClick={() => popUp(`https://www.youtube.com/watch?v=${elem.idYoutube}`)}>Trailer</p>
                        ):(
                            <p>No Trailer</p>
                        )}
                    </div>                  
                )  
        })   
        }       
        </div>
    )
}

export default Catalog;