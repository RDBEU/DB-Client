import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import styles from "./styles.module.css";
import { UilEye, UilEyeSlash } from '@iconscout/react-unicons';
import { AuthContext } from "../../context/auth.context";

function Login() {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("");
    const [visible2, setVisible2] = useState(false);
    const navigate = useNavigate()
    const { storeToken, authenticateUser } = useContext(AuthContext);


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}auth/login`, data);
            storeToken(res.data.authToken)
            authenticateUser();
            window.location = '/members';
        } catch (error) {
            if (error.response.status > 400) {
                navigate('/access-blocked')
            } else if(error.response.status == 400){
                setError(error.response.data)
            } else if(error.response.status <= 500){
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input} />
                    <div className={styles.passCont}>
                        <input
                            type={visible2 ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {visible2 ?
                            <UilEye onClick={() => setVisible2(false)} className={styles.icon} />
                            :
                            <UilEyeSlash onClick={() => setVisible2(true)} className={styles.icon} />
                        }
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>
                        Conectare
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
