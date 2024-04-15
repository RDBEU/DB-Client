import { useContext, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { UilTrash } from '@iconscout/react-unicons';
import { AuthContext } from '../../context/auth.context.jsx';

const Table = (props) => {
  const { user } = useContext(AuthContext);
  const [localCount, setLocalCount] = useState(0);


  useEffect(() => {
    const count = props.data.reduce((acc, item) => {
      return user.oras !== "Bucuresti" && user.oras === item.localitate ? acc + 1 : acc;
    }, 0);
    setLocalCount(count);
  }, [props.data, user.oras]); 
  return (
    <table>
      <tbody>
        <tr>
          {user.oras === "Bucurest" ?
          <th><p>Membrii in total: {localCount}</p></th>
          : 
          null
          } 
        </tr>
        <tr>
          <th>Nume</th>
          <th>Prenume</th>
          <th>Email</th>
          <th>Telefon</th>
          <th>Informatii</th>
        </tr>
        {props.data.map((item) => (
          user.oras === "Bucuresti" ? (
            <tr key={item._id} className={styles.data}>
              <td>{item.nume}</td>
              <td>{item.prenume}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td><Link to={`/members/${item._id}`} id={styles.link}>Profil complet</Link></td>
              <td><UilTrash id="deleteBtn" className={styles.trash} onClick={() => props.delete(item._id)} /></td>
            </tr>
          ) : (
            user.oras === item.localitate && (
              <tr key={item._id} className={styles.data}>
                <td>{item.nume}</td>
                <td>{item.prenume}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td><Link to={`/members/${item._id}`} id={styles.link} >Profil complet</Link></td>
              </tr>    
            )
          )
        ))}
      </tbody>
    </table>
  );
};

export default Table;


