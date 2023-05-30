import { useRef } from "react";
import "./register.css"
import axios from "axios";
import {useHistory} from "react-router";


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try{
                await axios.post("/auth/register", user);
                history.push("/login");
            }catch(err){
                console.log(err)
            }
        }
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social-App</h3>
                <span className="loginDesc">
                    Connect with frinds and the world around you on Social-App.
                </span>
            </div>
            <div className="loginRight">
                <div className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required ref={username} className="loginInput" />
                    <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                    <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6"/>
                    <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" />
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton">Log into your Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}