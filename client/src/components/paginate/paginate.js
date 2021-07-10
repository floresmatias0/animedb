import React from 'react';
import styles from '../../styles/Paginate.module.css';

const Paginate = (props) => {

    var pageNumber = []

    for(var i = 0; i <= Math.ceil(props.anime/props.postPerPage);i++){
        if(i >= 1) {
            pageNumber.push(i)
        }   
    }

    return (
        <div className={styles.container}>
            <ul className={styles.cuantity}>
            {pageNumber.map((elem,i)=>{
                return ( 
                    <li key={i}>
                        <p onClick={() => props.pagination(elem)}>
                            {elem} 
                        </p>
                    </li>   
                )
            })}
            </ul>
        </div> 
    )
}

export default Paginate;