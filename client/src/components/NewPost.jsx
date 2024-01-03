import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {createPost} from "../redux/postSlice";



function NewPost({username, setPostCreate}) {
    const currentPostInfo = useSelector(state => state.posts.currentPostInfo)
    const[title, setTitle] = useState(currentPostInfo.title)
    const[file, setFile] = useState(null)
    const dispatch = useDispatch()



    const createNewPost = ()=>{
        if(!title.trim()){
            alert('Title can`t be empty')
            return
        }
        dispatch(createPost({title, username, file}))
        setTitle('')
        setPostCreate(false
        )

    }

    const handleClose = ()=>{
        setPostCreate(false)
        setTitle('')
    }

    return (
        <div>
            <div>
                <button onClick={handleClose}>Close</button>
                <label htmlFor="title">Title: </label>
                <input name="title" type="text"
                       value={title}
                       onChange={(e)=>setTitle(e.target.value)}/>
            </div>

        </div>
    );
}

export default NewPost;