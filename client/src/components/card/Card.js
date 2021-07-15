import React from 'react';
import styles from '../../styles/Card.module.css';
import caratula from '../../assets/images/nocover.jpg'
import checked from '../../assets/images/checked.png'
import minus from '../../assets/images/minus.png'

const Card = (props) => {

    return (
        <div className={styles.container}>
        {props.anime.map((elem,i)=>{
                return (
                    <div className={styles.card} key={i}> 
                        {elem.coverImage === null ? (
                            <div className={styles.image}>
                                <img src={caratula} alt='back'/>
                            </div>
                        ) : (
                            <div className={styles.image}>
                                <img src={elem.coverImage["tiny"]} alt='back'/>
                            </div>
                        )}
                        <h2>{elem.name}</h2>
                        <img src={elem.image.small} alt='poster'/>
                        <h3>({elem.origin})</h3>
                        <p className={styles.description}>{elem.description}</p>
                        <p className={styles.check}>{elem.status} <img src={elem.status === "finished" ? checked : minus} alt="checked"/></p>
                    </div>                  
                )  
        })   
        }       
        </div>
    )
}

export default Card;