import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const storedToken = localStorage.getItem("authToken");
import styles from './styles.module.css'
function MemberProfile() {
    const param = useParams();
    const [member, setMember] = useState({});
    const [anul_nasterii, setAnulNasterii] = useState("");
    const [data_adeziunii, setDataAdeziunii] = useState("");
    const [editForm, setEditForm] = useState(false);
    const [isLink, setIsLink] = useState(false);

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
    };
    const [newData, setNewData] = useState(initialFormData)

    const checkLink = (value) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        setIsLink(urlRegex.test(value));
    };

    const checkValues = (obj) => {
        const retObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                retObj[key] = obj[key];
            }
        }
        for (const key in retObj) {
            if (retObj.hasOwnProperty(key) && retObj[key].length === 0) {
                delete retObj[key];
            }
        }
        return retObj;
    };

    const handleChange = ({ currentTarget: input }) => {
        setNewData({ ...newData, [input.name]: input.value })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let updatedInterests = [...newData.domeniu_de_interes];
        if (checked) {
            updatedInterests.push(name);
        } else {
            updatedInterests = updatedInterests.filter(
                (interest) => interest !== name
            );
        }
        setNewData({
            ...newData,
            domeniu_de_interes: updatedInterests,
        });
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}members/${param.id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((memberFromDB) => {
                setMember(memberFromDB.data)

                let date = new Date(memberFromDB.data.anul_nasterii);
                let month = "" + (date.getMonth() + 1);
                let day = "" + date.getDate();
                let year = date.getFullYear();
                let fullDate = day + " " + month + " " + year;
                setAnulNasterii(fullDate.toString());

                let date2 = new Date(memberFromDB.data.data_adeziunii);
                let month2 = "" + (date2.getMonth() + 1);
                let day2 = "" + date2.getDate();
                let year2 = date2.getFullYear();
                let fullDate2 = day2 + " " + month2 + " " + year2;
                setDataAdeziunii(fullDate2.toString());
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        checkLink(member.social_media);
    }, [member.social_media]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = checkValues(newData)
        axios.put(`${import.meta.env.VITE_API_URL}members/${param.id}`, updatedData, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setNewData(initialFormData)
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            })
    }
    return (
        <>
            {member && (
                <div className={styles.bigWrapper}>
                    <div>
                        <h2>Membru</h2>
                        <h1>{member.nume} {member.prenume}</h1>
                        <p><strong>Judet:</strong> {member.judet}</p>
                        <p><strong>Localitata:</strong> {member.localitate}</p>
                        <p><strong>Adresa:</strong> {member.adresa}</p>
                        <p><strong>CNP:</strong> {member.cnp}</p>
                        <p><strong>Anul nasterii:</strong> {anul_nasterii}</p>
                        <p><strong>Sex:</strong> {member.sex}</p>
                        <p><strong>Telefon:</strong> {member.phone}</p>
                        <p><strong>Domenii de interes:</strong></p>
                        <ul>
                            {member.domeniu_de_interes && member.domeniu_de_interes.map((domeniu) => {
                                return (
                                    <li key={domeniu} >{domeniu}</li>
                                )
                            }
                            )}
                        </ul>
                        <p><strong>Nivel Studii:</strong>{member.nivel_studii}</p> 
                        <p><strong>Profesie:</strong>{member.profesie}</p>
                        <p><strong>Ocupatie:</strong>{member.ocupatie}</p>
                        <p><strong>Loc de munca:</strong>{member.loc_de_munca}</p>
                        <p><strong>Email:</strong>{member.email}</p>
                        <p id={styles.social_media}> <strong>Social media:</strong>
                            {isLink ? (
                                    <a href={member.social_media} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                        Profil online                             </a>
                                   
                            ) : (
                                member.social_media
                            )}
                        </p>
                        <p><strong>Data adeziunii:</strong>{data_adeziunii}</p>
                        <p><strong>Plata cotizatie:</strong>{member.plata_cotizatie}</p>
                    </div>
                    <div id={styles.secondPart}>
                        <button onClick={() => setEditForm(!editForm)} className={styles.wrapper}>Edit</button>
                        {editForm ?
                            <form onSubmit={handleSubmit} className={styles.container}>
                                <label htmlFor="nume">Nume</label>
                                <input
                                    type="text"
                                    id="nume"
                                    name="nume"
                                    onChange={handleChange}
                                    value={newData.nume}
                                    className={styles.input}
                                />
                                <label htmlFor="prenume">Prenume</label>
                                <input
                                    type="text"
                                    id="prenume"
                                    name="prenume"
                                    onChange={handleChange}
                                    value={newData.prenume}
                                    className={styles.input} />
                                <label htmlFor="phone">Telefon</label>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    className={styles.input}
                                    id="phone"
                                    name="phone"
                                    onChange={handleChange}
                                    value={newData.phone}
                                />
                                <label htmlFor="judet">Judet</label>
                                <input
                                    type="text"
                                    id="judet"
                                    name="judet"
                                    onChange={handleChange}
                                    value={newData.judet}
                                    className={styles.input} />
                                <label htmlFor="localitate">Localitate</label>
                                <input
                                    type="text"
                                    id="localitate"
                                    name="localitate"
                                    onChange={handleChange}
                                    value={newData.localitate}
                                    className={styles.input} />
                                <label htmlFor="adresa">Adresa</label>
                                <input
                                    type="text"
                                    id="adresa"
                                    name="adresa"
                                    onChange={handleChange}
                                    value={newData.adresa}
                                    className={styles.input} />
                                <label htmlFor="cnp">CNP</label>
                                <input
                                    type="number"
                                    id="cnp"
                                    name="cnp"
                                    onChange={handleChange}
                                    value={newData.cnp}
                                    className={styles.input} />
                                <label htmlFor="anul_nasterii">Anul nasterii</label>
                                <input
                                    type="date"
                                    id="anul_nasterii"
                                    name="anul_nasterii"
                                    onChange={handleChange}
                                    value={newData.anul_nasterii}
                                    className={styles.input} />
                                <label htmlFor="sex">Sex</label>
                                <select name="sex" id="sex" value={newData.sex} onChange={handleChange}>
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
                                <select name="nivel_studii" id="nivel_studii" value={newData.nivel_studii} onChange={handleChange}>
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
                                    value={newData.profesie}
                                    className={styles.input} />
                                <label htmlFor="ocupatie">Ocupatie</label>
                                <input
                                    type="text"
                                    id="ocupatie"
                                    name="ocupatie"
                                    onChange={handleChange}
                                    value={newData.ocupatie}
                                    className={styles.input} />
                                <label htmlFor="loc_de_munca">Loc de munca</label>
                                <input
                                    type="text"
                                    id="loc_de_munca"
                                    name="loc_de_munca"
                                    onChange={handleChange}
                                    value={newData.loc_de_munca}
                                    className={styles.input} />
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={newData.email}
                                    className={styles.input} />
                                <label htmlFor="social_media">Social media</label>
                                <input
                                    type="text"
                                    id="social_media"
                                    name="social_media"
                                    onChange={handleChange}
                                    value={newData.social_media}
                                    className={styles.input} />
                                <label htmlFor="data_adeziunii">Data adeziunii</label>
                                <input
                                    type="date"
                                    id="data_adeziunii"
                                    name="data_adeziunii"
                                    onChange={handleChange}
                                    value={newData.data_adeziunii}
                                    className={styles.input} />
                                <label htmlFor="plata_cotizatie">Plata cotizatie</label>
                                <input
                                    type="number"
                                    id="plata_cotizatie"
                                    name="plata_cotizatie"
                                    onChange={handleChange}
                                    value={newData.plata_cotizatie}
                                    className={styles.input} />
                                <button type="submit" className={styles.wrapper}>Adauga</button>
                            </form>
                            : null
                        }
                    </div>
                </div >
            )
            }
        </>
    )

}

export default MemberProfile
