import React from 'react';
import styles from '../../styles/Card.module.css';
import caratula from '../../assets/images/caratulaDefault.jpg'

const Card = (props) => {

    return (
        <div className={styles.container}>
        {props.anime.map((elem,i)=>{
                return (
                    <div className={styles.card} key={i}> 
                        {elem.coverImage === null ? (
                            <p>no cover</p>
                        ) : (
                            <div className={styles.image}>
                                <img src={elem.coverImage["tiny"]} alt='back'/>
                            </div>
                        )}
                        <h2>{elem.name}({elem.origin})</h2>
                        <img src={elem.image.small} alt='poster'/>
                        <p className={styles.description}>{elem.description}</p>
                        <p>{elem.status}</p>
                    </div>                  
                )  
        })   
        }       
        </div>
    )
}

export default Card;