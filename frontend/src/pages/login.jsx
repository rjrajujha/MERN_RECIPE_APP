import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from './login.module.css';

const APIUrl = process.env.REACT_APP_APIURL;

const LogIn = () => {

    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${APIUrl}/login`, {
                username: username,
                password: password
            }).then((res) => {
                if (res.data.status === "Sucess") {
                    window.localStorage.setItem("token", res.data.token);
                    alert("LogIn Sucessfull");
                    navigate('/recipe')
                }
                else {
                    alert(res.data.message);
                }
            }).catch((e) => {
                console.log("Error", e)
            }).finally(() => {
                console.log("User Info Fetched")
            })
    }

    const SignUp = () => {
        navigate('/reg')
    }

    return (
        <>

            <div className={`${Styles.flex_col} ${Styles.bg_blue}`}>
                <div className={Styles.flex}></div>
                <h2 className={Styles.margin_auto}>Sign In</h2>

                <form onSubmit={(e) => { handleSubmit(e) }} className={Styles.margin_auto}>

                    <label className={Styles.label}> Email adress
                        <input type='email' value={username} onChange={(e) => { setUserName(e.target.value) }}
                            placeholder="yourname@domain.net" required /> </label> <br />

                    <label className={Styles.label}> Password
                        <input type='password' value={password} onChange={(e) => { setPassword(e.target.value); }}
                            placeholder="Password" required />  </label>  <br />

                    <label>
                        <input type='checkbox'></input>
                        Reamber me
                    </label>
                    <br />
                    <input type='submit' value='LOGIN' />

                </form>
                <br />
                <p onClick={SignUp} className={Styles.signuptxt}> Register </p> <br />

            </div>
        </>
    )
}

export default LogIn;