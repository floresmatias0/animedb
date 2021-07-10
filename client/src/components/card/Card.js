import React from 'react';
import styles from '../../styles/Card.module.css';
import caratula from '../../assets/images/caratulaDefault.jpg'

const Card = (props) => {

    return (
        <div className={styles.container}>
        {props.anime.map((elem,i)=>{
                return (
                    <div className={styles.card} key={i}> 
                        <p>{elem.name}({elem.origin})</p>
                        <p>{elem.description}</p>
                        <img src={elem.image.large} alt='poster'/>
                        {elem.coverImage === null ? (
                            <p>no cover</p>
                        ) : (
                            <img src={elem.coverImage["tiny"]} alt='back'/>
                        )}
                        <p>{elem.status}</p>
                    </div>                  
                )  
        })   
        }       
        </div>
    )
}

export default Card;