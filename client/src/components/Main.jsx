import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPostInfo, setEdit} from '../redux/postSlice'
import css from './main.module.css'
import NewPost from "./Post/NewPost";
import PostsLayout from "./Post/PostsLayout";
import Paginator from "./Paginator";
import Post from "./Post/Post";

function Main(props) {
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.name)
    const posts = useSelector(state => state.posts.posts)
    const loading = useSelector(state => state.posts.loading)

    const [newPostCreate, setNewPostCreate] = useState(false)
    const pageNum = useSelector(state => state.posts.pageNum)
   
    const postCreate = () =>{
        dispatch(setCurrentPostInfo({title: '', imageSrc: null}))
        dispatch(setEdit(false))
        setNewPostCreate(true)
    }



    return (
        <div>
            <Header/>
            <div className={css.main}>
                <button onClick={postCreate}>
                    Create Post
                </button>
                {newPostCreate && <NewPost username = {username}
                                           setPostCreate = {setNewPostCreate}/>}
                {loading === 'pending'
                    ? <div>Loading...</div>
                    : <PostsLayout>
                        {posts && [...posts]
                            .sort((a, b) => b.date - a.date)
                            .map((post) => <Post key={post.id}
                                                 {...post}
                                                 currentUserName={username}
                                                 setNewPost={setNewPostCreate}
                                                 pageNum={pageNum}
                            />)}
                    </PostsLayout>}
                <Paginator setNewPost={setNewPostCreate}
                />
            </div>
        </div>
    );
}

export default Main;