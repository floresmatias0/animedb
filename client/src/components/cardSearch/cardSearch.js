import React from 'react';
import styles from '../../styles/CardSearch.module.css';
import caratula from '../../assets/images/nocover.jpg';
import checked from '../../assets/images/checked.png';
import minus from '../../assets/images/minus.png';

const CardSearch = (props) => {

    return (
        <div className={styles.container}>
        {props.anime.map((elem,i)=>{
                return (
                    <div className={styles.card} key={i}>
                        <div className={styles.banner}>
                            {elem.coverImage === null ? (
                                <div className={styles.image}>
                                    <img src={caratula} alt='back' height="100%"/>
                                </div>
                            ) : (
                                <div className={styles.image}>
                                    <img src={elem.coverImage["tiny"]} alt='back'/>
                                </div>
                            )}
                        </div>
                        <div className={styles.contentCard}> 
                            <div className={styles.imageAnime}>
                                <img src={elem.image.small} alt='poster' width="180px"/>   
                            </div>
                            <div>
                                <h2>{elem.name}</h2>
                                <h3>({elem.origin})</h3>
                                <p className={styles.description}>{elem.description}</p>
                                <p className={styles.check}>
                                    {elem.status} 
                                    <img src={elem.status === "finished" ? checked : minus} alt="checked"/>
                                </p> 
                            </div>

                        </div> 
                    </div>                 
                )  
        })   
        }       
        </div>
    )
}

export default CardSearch;