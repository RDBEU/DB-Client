import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import styles from './styles.module.css'
import { UilSearch } from '@iconscout/react-unicons'
import Table from '../Table/Table';
import { AuthContext } from '../../context/auth.context';
const storedToken = localStorage.getItem("authToken");
import { UilHistory } from '@iconscout/react-unicons'
function GetMembers() {
    const [allMembers, setAllMembers] = useState([]);
    const [count, setCount] = useState('')
    const [formVisible, setFormVisible] = useState(false);
    const { user } = useContext(AuthContext)
    const [error, setError] = useState(false);
    const initialForm = {
        nume: "",
        prenume: "",
        phone: "",
        judet: "",
        localitate: "",
        adresa: "",
        cnp: "",
        sex: "",
        domeniu_de_interes: [],
        nivel_studii: "",
        profesie: "",
        ocupatie: "",
        loc_de_munca: "",
        email: "",
        social_media: "",
        sort: [],
        sortOrder: ""
    }
    const [data, setFormData] = useState(initialForm)

    const objectToQueryString = (obj) => {
        return Object.keys(obj)
            .filter(key => obj[key] !== undefined && obj[key] !== null && obj[key] !== "" && obj[key] !== 0)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    };
    const queryParameters = objectToQueryString({
        nume: data.nume,
        prenume: data.prenume,
        email: data.email,
        phone: data.phone,
        cnp: data.cnp,
        localitate: data.localitate,
        judet: data.judet,
        nivel_studii: data.nivel_studii,
        profesie: data.profesie,
        ocupatie: data.ocupatie,
        loc_de_munca: data.loc_de_munca,
        sex: data.sex,
        domeniu_de_interes: data.domeniu_de_interes.join(','),
        social_media: data.social_media,
        sort: data.sort,
        sortOrder: data.sortOrder
    });
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}members`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setAllMembers(response.data.members)
                setCount(response.data.count);
            })
            .catch((error) => setError(true));
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let updatedInterests = [...data.domeniu_de_interes];
        if (checked) {
            updatedInterests.push(name);
        } else {
            updatedInterests = updatedInterests.filter(
                (interest) => interest !== name
            );
        }
        setFormData({
            ...data,
            domeniu_de_interes: updatedInterests,
        });
    };
    const handleChange = ({ currentTarget: input }) => {
        setFormData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get(`${import.meta.env.VITE_API_URL}members?${queryParameters}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(response => {
                setAllMembers(response.data.members)
            })
            .catch((error) => setError(true));
    };


    const handleDelete = (postId) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}members/${postId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                setAllMembers(allMembers.filter((current) => current._id !== postId));
            })
            .catch((error) => console.log(error));
    }

    const handleReset = () => {
        setFormData(initialForm)
        window.location.reload();
    }

    
    return (
        <div className={styles.container}>
            <button className={styles.wrapper} onClick={() => setFormVisible(!formVisible)}><UilSearch className={styles.icon} /> Cauta membru</button>
            {formVisible ?
                <form className={styles.searchingForm} onSubmit={handleSubmit}>
                    <div>
                        <fieldset>
                            <label htmlFor="nume">Nume</label>
                            <input type="text" id="nume" name="nume" className={styles.searchInput} onChange={handleChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="prenume">Prenume</label>
                            <input type="text" id="prenume" name="prenume" className={styles.searchInput} onChange={handleChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className={styles.searchInput} autoComplete="true" onChange={handleChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="phone">Telefon</label>
                            <input type="text" id="phone" name="phone" className={styles.searchInput} autoComplete="true" onChange={handleChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="cnp">CNP:</label>
                            <input type="text" id="cnp" name="cnp" className={styles.searchInput} onChange={handleChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="judet">Judet</label>
                            <input type="text" id="judet" name="judet" className={styles.searchInput} onChange={handleChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="localitate">Localitate</label>
                            <input type="text" id="localitate" name="localitate" className={styles.searchInput} onChange={handleChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="sex">Sex</label>
                            <select name="sex" id="sex" className={styles.searchInput} onChange={handleChange}>
                                <option value=""> </option>
                                <option value="feminin">Feminin</option>
                                <option value="masculin">Masculin</option>
                            </select>
                        </fieldset>
                        <fieldset className={styles.domeniu}>
                            <legend>Domeniu de interes</legend>
                            <label htmlFor='tineret'><input type="checkbox" id="tineret" name="Tineret" onChange={handleCheckboxChange} />Tineret</label>
                            <label htmlFor='femei'><input type="checkbox" id="femei" name="Femei" onChange={handleCheckboxChange} />Femei</label>
                            <label htmlFor='activisti_nationali'><input type="checkbox" id="activisti_nationali" name="Activisti nationali" onChange={handleCheckboxChange} />Activisti nationali</label>
                            <label htmlFor='alesi_locali'><input type="checkbox" id="alesi_locali" name="Alesi locali" onChange={handleCheckboxChange} />Alesi locali</label>
                            <label htmlFor='consilier_informal'><input type="checkbox" id="consilier_informal" name="Consilieri informali" onChange={handleCheckboxChange} />Consilieri informali</label>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="social_media">Social media</label>
                            <input
                                type="text"
                                id="social_media"
                                name="social_media"
                                className={styles.searchInput}
                                onChange={handleChange} />
                        </fieldset>
                        <fieldset className={styles.radioGrp}>
                            <section>
                                <input type="radio" name="sort" value="data_adeziunii" onChange={handleChange}/><label htmlFor="data_adeziunii">Data adeziunii</label>
                            </section>
                            <section>
                                <input type="radio" name="sort" value="anul_nasterii" onChange={handleChange}/><label htmlFor="data_adeziunii">Anul nasterii</label>
                            </section>
                            <section>
                                <input type="radio" name="sort" value="plata_cotizatie" onChange={handleChange}/><label htmlFor="data_adeziunii">Plata cotizatie</label>
                            </section>
                        </fieldset>
                        <fieldset>
                            <legend className={styles.ordine}>Ordine</legend>
                            <select name="sortOrder" id="sortOrder" className={styles.searchInput} onChange={handleChange}>
                                <option value=""> </option>
                                <option value="asc">ordine crescatoare</option>
                                <option value="desc">ordine descrescatoare</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="nivel_studii">Nivel Studii</label>
                            <select name="nivel_studii" id="nivel_studii" className={styles.searchInput} onChange={handleChange}>
                                <option value=""> </option>
                                <option value="Medii">Medii</option>
                                <option value="Generale">Generale</option>
                                <option value="Superioare">Superioare</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className={styles.btnGroup}>
                        <button type="submit" className={styles.wrapper}>Cauta</button>
                        <button className={styles.wrapper} id={styles.resetBtn} onClick={handleReset}><UilHistory />Resetează</button>
                    </div>
                </form>
                :
                null
            }
            <div className={styles.memberWrapper}>
                {user.oras === "Bucuresti" ?
                    <p>Membrii in total: {count}</p>
                    : null
                }
                {allMembers && !error ?
                    <Table data={allMembers} delete={handleDelete} />
                    :
                    <div>
                        <p>Niciun membru existent</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default GetMembers;