import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from './signup.module.css';

const APIUrl = process.env.REACT_APP_APIURL;


const SignUp = () => {

    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [TnC, setTnC] = useState(false);

    const handleTnC = () => {
        setTnC(!TnC);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!TnC) {
            alert('You must agree TnC');
            return;
        }

        if (password !== cpassword) {
            alert('Both password did not match');
            return;
        }

        axios
            .post(`${APIUrl}/signup`, {
                username: username,
                password: password
            }).then((res) => {

                if (res.data.status === "Success") {
                    alert(res.data.message);
                    navigate('/')
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

    const LogIn = () => {
        navigate('/')
    }


    return (
        <>
            <div className={`${Styles.flex_col} ${Styles.border} `}>

                <div className={`${Styles.flex} ${Styles.signuphead} `}>
                    <p onClick={LogIn} className={Styles.backtologin}> &lt; </p>  <p className={Styles.signuptext}>SIGN UP</p>
                </div>

                <form onSubmit={(e) => { handleRegister(e) }} className={Styles.margin_auto} >

                    <input type='email' value={username} onChange={(e) => { setUserName(e.target.value) }}
                        placeholder="yourname@domain.net" required /><br /><br />

                    <input type='text' value={password} onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Password" required /><br /><br />

                    <input type='password' value={cpassword} onChange={(e) => { setcPassword(e.target.value) }} onPaste={(e) => {
                        e.preventDefault();
                        alert("Pasting is not allowed!");
                    }}
                        placeholder="Conform Password" required /><br /><br />

                    <label>
                        <input type='checkbox' checked={TnC} onChange={handleTnC} />
                        I agree <a href="https://github.com/rjrajujha">terms & conditions</a>
                    </label>
                    <br />
                    <input type='submit' value='Register' className={Styles.btn} />
                </form>
            </div>
        </>
    )
}

export default SignUp;