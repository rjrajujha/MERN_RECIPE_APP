import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from './recipe.module.css';

import axios from "axios";
const APIUrl = process.env.REACT_APP_APIURL;

const Recipe = () => {

    const [jsondata, setJSONData] = useState([]);
    const [fecth, fetched] = useState(false)

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // console.log("Token from react :", token);

    const getJSONdata = async () => {
        //Getting JSON Data
        await axios
            .get(`${APIUrl}/json`, {
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
                if (res.data) {
                    setJSONData(res.data)
                }
                else {
                    console.log("Error Connecting Backend");
                }
            }).catch((e) => {
                console.log("Error Connecting Backend :", e)
            }).finally(() => {
                console.log("Backend Connection finished")
            })
        fetched(true);
    }

    useEffect(() => {
        if (!token) {
            console.warn("not_a_token");
            navigate('/');
        }
        if (!fecth) {
            getJSONdata();
        }
    })

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged Out");
        navigate('/');
    }

    return (
        <>
            <div className={Styles.head}>
                <div className={Styles.flex}>
                    <img className={Styles.logo} src="https://www.shutterstock.com/image-vector/love-eat-logo-cafe-restaurant-600w-513914290.jpg" alt="logo"></img>
                    <p className={Styles.margin_auto}>Recipi App</p>
                </div>
              
                <div className={Styles.margin_auto}>
                    <input className={Styles.searchbox} placeholder="&#xf08e; Search" />
                </div>

                <button onClick={handleLogout}>LogOut</button>
            </div>

            <div className={Styles.flex}>
                {jsondata.map((e, i) => {
                    return (
                        <div className={Styles.card}>
                            <p>{i + 1}</p>
                            <p> {e.title} </p>
                            <p>{e.author}</p>
                            <img src={e.image.url} alt={e.image.type}></img>
                        </div>
                    )
                })}
            </div >
        </>
    )

}
export default Recipe;