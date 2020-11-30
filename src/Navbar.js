import './Navbar.css';
import React from 'react';
import { auth } from "./firebase";
import { Avatar, IconButton } from '@material-ui/core';
import DarkModeIcon from '@material-ui/icons/Brightness4Rounded';
import LightModeIcon from '@material-ui/icons/Brightness7Rounded';
import { useStateValue } from './StateProvider';

const Navbar = () => {
    const [{ user, mode }, dispatch] = useStateValue();

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
        <div className={mode === "dark" ? "navbar" : "navbar--light"}>
            <Avatar className="navbar__avatar" src={user?.photoURL} onClick={() => auth.signOut()} title="log out" />
            <h1 className={mode === "dark" ? "navbar__heading" : "navbar__heading--light"}>Keep TODOs</h1>
            <IconButton onClick={changeMode}>
                {
                    mode === "dark"
                        ? <LightModeIcon className={mode === "dark" ? "navbar__modeIcon" : "navbar__modeIcon--light"} />
                        : <DarkModeIcon className={mode === "dark" ? "navbar__modeIcon" : "navbar__modeIcon--light"} />
                }
            </IconButton>
        </div>
    )
}

export default Navbar;
