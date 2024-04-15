import React from 'react'
import styles from './styles.module.css'
function AccessBlocked() {
    return (
        <>  
            <h1 className={styles.title}>Sorry!...</h1> 
            <p className={styles.text}> You are not allowed to enter this page. Please visit <a href="https://google.com" target="_blank">Google</a> for more fun pages!</p> 
        </>
    )   
}

export default AccessBlocked
