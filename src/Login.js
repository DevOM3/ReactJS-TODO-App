import './Login.css';
import React from 'react';
import { auth, provider } from './firebase';
import { Button, IconButton } from '@material-ui/core';
import { useStateValue } from "./StateProvider";
import DarkModeIcon from '@material-ui/icons/Brightness4Rounded';
import LightModeIcon from '@material-ui/icons/Brightness7Rounded';

const Login = () => {
    const [{ mode }, dispatch] = useStateValue();

    const login = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(error => alert(error.message))
    }

    const changeMode = e => {
        mode === "dark"
            ? dispatch({
                type: "SET_MODE",
                mode: "light",
            })
            : dispatch({
                type: "SET_MODE",
                mode: "dark",
            })
    }

    return (
        <div className={mode === "dark" ? "login" : "login--light"}>
            <IconButton onClick={changeMode}>
                {
                    mode === "dark"
                        ? <LightModeIcon className={mode === "dark" ? "login__modeIcon" : "login__modeIcon--light"} />
                        : <DarkModeIcon className={mode === "dark" ? "login__modeIcon" : "login__modeIcon--light"} />
                }
            </IconButton>
            <div className={mode === "dark" ? "login__container" : "login__container--light"}>
                <h1 className={mode === "dark" ? "login__title" : "login__title--light"}>Login</h1>
                <Button className={mode === "dark" ? "login__button" : "login__button--light"} onClick={login}>Keep TODOs with Google</Button>
            </div>
        </div>
    )
}

export default Login;
