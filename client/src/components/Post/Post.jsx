import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {deleteCommentById, deletePostById, setCurrentPostInfo, setEdit, updatePost} from "../../redux/postSlice";
import Comment from "../Comment";
import css from './post.css'

function Post(props) {
    const dispatch = useDispatch()
    const isMine = props.currentUserName === props.username
    const [comment, setComment] = useState(false)
    const [newComment, setNewComment] = useState(false)




    const handleEdit = () => {
        dispatch(setCurrentPostInfo({id: props.id, title: props.title, imageSrc: null}))
        dispatch(setEdit(true))
        props.setNewPost(true)

    }

    const like = () =>{
        const index = props.likes.findIndex(author => author === props.currentUserName)
        const tempLikes = [...props.likes]
        tempLikes.splice(index, 1)
        dispatch(updatePost({postId: props.id, likes: tempLikes}))
    }

    const dislike = () =>{
        const index = props.dislike.findIndex(author => author === props.currentUserName)
        const tempDisLikes = [...props.dislikes]
        tempDisLikes.splice(index, 1)
        dispatch(updatePost({postId: props.id, dislikes: tempDisLikes}))
    }

    const handleLike = ()=>{
        if(props.likes.includes(props.currentUserName)){
            like()
        }else{
            if (props.dislikes.includes(props.currentUserName)){
                dislike()
            }
            dispatch(updatePost({postId: props.id, likes: [...props.likes, props.currentUserName]}))
        }
    }

    const deletePost = () => {
        dispatch(deletePostById(props.id))
    }

    const handleDisLike = ()=>{
        if(props.dislikes.includes(props.currentUserName)){
            dislike()
        }else{
            if (props.likes.includes(props.currentUserName)){
                like()
            }
            dispatch(updatePost({postId: props.id, dislikes: [...props.dislikes, props.currentUserName]}))
        }
    }





    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <img src={props.imageSrc} alt={''}/>
            </div>
            <div className={css.footer}>
                <span>{props.username}</span>
            </div>
            <button className={css.like}>like</button>
            <button className={css.dislike}>dislike</button>
            <span>{props.likes.length - props.dislikes.length}</span>
            {isMine && <button  onClick={deletePost}>
                Delete
            </button>}
            {isMine && <button  onClick={handleEdit}>
                Edit
            </button>}
            <div>
                <button onClick={()=> setComment(!comment)}>
                    Comments
                </button>
            </div>
            {comment && <button onClick={()=>setNewComment(!newComment)}>New comment</button>}
            {comment && props.comment && props.comment.map(comment =>{
                <Comment></Comment>
                //Add logic
            })}

        </div>

    );
}

export default Post;