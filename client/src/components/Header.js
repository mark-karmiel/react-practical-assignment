import React from 'react';
import {login} from "../redux/userSlice"
import {useDispatch, useSelector} from "react-redux";
import css from './main.module.css'


function Header(props) {
    const username = useSelector(state => state.user.name)
    const dispatch = useDispatch()
    const logout = () =>{
        dispatch(login(''))
    }
    return (
        <div className={css.header}>
            <h3>{username}</h3>
<button onClick={logout}>Log out</button>
        </div>
    );
}

export default Header;