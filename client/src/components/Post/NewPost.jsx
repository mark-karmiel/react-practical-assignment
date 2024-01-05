import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {createPost, updatePost} from "../../redux/postSlice";
import UPLOAD from "../../assets/upload.png"



function NewPost({username, setPostCreate}) {
    const currentPostInfo = useSelector(state => state.posts.currentPostInfo)
    const[title, setTitle] = useState(currentPostInfo.title)
    const[file, setFile] = useState(null)
    const edit = useSelector(state => state.posts.edit)
    const dispatch = useDispatch()



    const createNewPost = ()=>{
        if(!title.trim()){
            alert('Title can`t be empty')
            return
        }
        dispatch(createPost({title, username, file}))
        setTitle('')
        setPostCreate(false)

    }
    const updateNewPost = ()=>{
        if(!title.trim()){
            alert('Title can`t be empty')
            return
        }
        dispatch(updatePost({title, username, file}))
        setTitle('')
        setPostCreate(false)

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

                <input type="file" id="picture" name="picture"
                       onChange={(e) =>setFile(e.target.files[0])}/>
                <img
                    src={file? URL.createObjectURL(file) : UPLOAD}
                    alt="Preview"
                />
                <button onClick={()=>{
                    !edit? createNewPost():updateNewPost()
                }}>
                    Submit
                </button>
            </div>

        </div>
    );
}

export default NewPost;