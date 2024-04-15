import React from 'react'
import CreateMembers from '../../components/CreateMembers/CreateMembers'
import GetMembers from '../../components/GetMembers/GetMembers'
import styles from './styles.module.css';
function Members() {
    return (
        <div className={styles.container}>  
            <CreateMembers/>
            <GetMembers/>
        </div>
    )
}

export default Members
