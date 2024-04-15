import React from 'react'
import styles from '../AccessBlocked/styles.module.css';
function NonExistent() {
    return (
        <>
        <h1 className={styles.title}>Error 404</h1>
        <p className={styles.text}>The page you are looking for does not exist</p>
        </>
    )
}

export default NonExistent
