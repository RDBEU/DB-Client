import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.css'
import { UilPlusCircle } from '@iconscout/react-unicons'
import { AuthContext } from '../../context/auth.context.jsx';
import axios from 'axios';
const storedToken = localStorage.getItem("authToken");
function CreateMembers() {
    const { user, logOutUser } = useContext(AuthContext);
    const [formVisible, setFormVisible] = useState(false);
    const [err, setError] = useState('');

    const initialFormData = {
        nume: "",
        prenume: "",
        phone: "",
        judet: "",
        localitate: "",
        adresa: "",
        cnp: "",
        anul_nasterii: "",
        sex: "",
        domeniu_de_interes: [],
        nivel_studii: "",
        profesie: "",
        ocupatie: "",
        loc_de_munca: "",
        email: "",
        social_media: "",
        data_adeziunii: "",
        plata_cotizatie: 0,
        autor: user._id
    };
    const [data, setData] = useState(initialFormData)

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
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
        setData({
            ...data,
            domeniu_de_interes: updatedInterests,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { res } = await axios.post(`${import.meta.env.VITE_API_URL}members`, data, {headers: { Authorization: `Bearer ${storedToken}`}});
            setData(initialFormData);
            window.location.reload();
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.btnGroup}>
                <button className={styles.wrapper} onClick={() => setFormVisible(!formVisible)}><UilPlusCircle className={styles.icon} /> Adauga membru</button>
                <p><strong>{user.email}</strong></p>
                <button className={styles.wrapper} onClick={logOutUser}>Deconectare</button>
            </div>
            {formVisible ?
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nume">Nume</label>
                    <input
                        type="text"
                        id="nume"
                        name="nume"
                        onChange={handleChange}
                        value={data.nume}
                        className={styles.input}
                    />
                    <label htmlFor="prenume">Prenume</label>
                    <input
                        type="text"
                        id="prenume"
                        name="prenume"
                        onChange={handleChange}
                        value={data.prenume}
                        className={styles.input} />
                    <label htmlFor="phone">Telefon</label>
                    <input
                        type="text"
                        placeholder="Phone number"
                        className={styles.input}
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        value={data.phone}
                        required
                    />
                    <label htmlFor="judet">Judet</label>
                    <input
                        type="text"
                        id="judet"
                        name="judet"
                        onChange={handleChange}
                        value={data.judet}
                        className={styles.input} />
                    <label htmlFor="localitate">Localitate</label>
                    <input
                        type="text"
                        id="localitate"
                        name="localitate"
                        onChange={handleChange}
                        value={data.localitate}
                        className={styles.input} />
                    <label htmlFor="adresa">Adresa</label>
                    <input
                        type="text"
                        id="adresa"
                        name="adresa"
                        onChange={handleChange}
                        value={data.adresa}
                        className={styles.input} />
                    <label htmlFor="cnp">CNP</label>
                    <input
                        type="number"
                        id="cnp"
                        name="cnp"
                        onChange={handleChange}
                        value={data.cnp}
                        className={styles.input} />
                    <label htmlFor="anul_nasterii">Anul nasterii</label>
                    <input
                        type="date"
                        id="anul_nasterii"
                        name="anul_nasterii"
                        onChange={handleChange}
                        value={data.anul_nasterii}
                        className={styles.input} />
                    <label htmlFor="sex">Sex</label>
                    <select name="sex" id="sex" value={data.sex} onChange={handleChange}>
                        <option value=""> </option>
                        <option value="feminin">Feminin</option>
                        <option value="masculin">Masculin</option>
                    </select>
                    <fieldset className={styles.domeniu}>
                        <legend>Domeniu de interes</legend>
                        <label htmlFor='tineret'><input type="checkbox" id="tineret" name="Tineret" onChange={handleCheckboxChange} />Tineret</label>
                        <label htmlFor='femei'><input type="checkbox" id="femei" name="Femei" onChange={handleCheckboxChange} />Femei</label>
                        <label htmlFor='activisti_nationali'><input type="checkbox" id="activisti_nationali" name="Activisti nationali" onChange={handleCheckboxChange} />Activisti nationali</label>
                        <label htmlFor='alesi_locali'><input type="checkbox" id="alesi_locali" name="Alesi locali" onChange={handleCheckboxChange} />Alesi locali</label>
                        <label htmlFor='consilier_informal'><input type="checkbox" id="consilier_informal" name="Consilieri informali" onChange={handleCheckboxChange} />Consilieri informali</label>
                    </fieldset>
                    <label htmlFor="nivel_studii">Nivel Studii</label>
                    <select name="nivel_studii" id="nivel_studii" value={data.nivel_studii} onChange={handleChange}>
                        <option value=""> </option>
                        <option value="Medii">Medii</option>
                        <option value="Generale">Generale</option>
                        <option value="Superioare">Superioare</option>
                    </select>
                    <label htmlFor="profesie">Profesie</label>
                    <input
                        type="text"
                        id="profesie"
                        name="profesie"
                        onChange={handleChange}
                        value={data.profesie}
                        className={styles.input} />
                    <label htmlFor="ocupatie">Ocupatie</label>
                    <input
                        type="text"
                        id="ocupatie"
                        name="ocupatie"
                        onChange={handleChange}
                        value={data.ocupatie}
                        className={styles.input} />
                    <label htmlFor="loc_de_munca">Loc de munca</label>
                    <input
                        type="text"
                        id="loc_de_munca"
                        name="loc_de_munca"
                        onChange={handleChange}
                        value={data.loc_de_munca}
                        className={styles.input} />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        className={styles.input} />
                    <label htmlFor="social_media">Social media</label>
                    <input
                        type="text"
                        id="social_media"
                        name="social_media"
                        onChange={handleChange}
                        value={data.social_media}
                        className={styles.input} />
                    <label htmlFor="data_adeziunii">Data adeziunii</label>
                    <input
                        type="date"
                        id="data_adeziunii"
                        name="data_adeziunii"
                        onChange={handleChange}
                        value={data.data_adeziunii}
                        className={styles.input} />
                    <label htmlFor="plata_cotizatie">Plata cotizatie</label>
                    <input
                        type="number"
                        id="plata_cotizatie"
                        name="plata_cotizatie"
                        onChange={handleChange}
                        value={data.plata_cotizatie}
                        className={styles.input} />
                    <button type="submit" className={styles.wrapper}>Adauga</button>
                    <div>{err}</div>
                </form>
                : null
            }
        </div>
    )
}

export default CreateMembers
