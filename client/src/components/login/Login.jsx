import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import css from './login.module.css'
import {login} from "../../redux/userSlice";


function Login(props) {
    const dispatch = useDispatch()
    const [userLogin, setUserLogin] = useState('')
    const [error, setError] = useState(null)

    const submit = () => {
        if (!userLogin) {
            setError("Username can't be empty")
        } else {
            dispatch(login(userLogin))

        }
    }

    return (
        <div className={'css.login'}>
            <label>User: </label>
            <input
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
                onKeyUp={(e) => {if (e.key === 'Enter') submit()}}
            />
            {error && <p style = {{color:'red'}}> {error}</p>}
            <button onClick={submit}>Auth</button>
        </div>
    )

}

export default Login