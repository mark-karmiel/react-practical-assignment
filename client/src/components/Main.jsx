import React, {useState} from 'react';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPostInfo, setEdit} from '../redux/postSlice'
import css from './main.module.css'
import NewPost from "./NewPost";

function Main(props) {
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.name)
    const posts = useSelector(state => state.posts.posts)
    const loading = useSelector(state => state.posts.loading)

    const [newPostCreate, setPostCreate] = useState(false)
    const postCreate = () =>{
        dispatch(setCurrentPostInfo({title: '', imageSrc: null}))
        dispatch(setEdit(false))
        setPostCreate(true)
    }



    return (
        <div>
            <Header/>
            <div className={css.main}>
                <button onClick={postCreate}>
                    Create Post
                </button>
                {newPostCreate && <NewPost username = {username}
                                           setPostCreate = {setPostCreate}/>}

            </div>
        </div>
    );
}

export default Main;