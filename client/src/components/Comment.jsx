import React from 'react';
import {useDispatch} from "react-redux";
import {deleteCommentById, deletePostById, updateCommentById, updatePost} from "../redux/postSlice";
import css from './Post/post.css'

function Comment(props) {
    const dispatch = useDispatch()
    const isMine = props.currentUserName === props.username

    const like = () =>{
        const index = props.likes.findIndex(author => author === props.currentUserName)
        const tempLikes = [...props.likes]
        tempLikes.splice(index, 1)
        dispatch(updateCommentById({commentId: props.id, likes: tempLikes}))
    }

    const dislike = () =>{
        const index = props.dislike.findIndex(author => author === props.currentUserName)
        const tempDisLikes = [...props.dislikes]
        tempDisLikes.splice(index, 1)
        dispatch(updateCommentById({commentId: props.id, dislikes: tempDisLikes}))
    }

    const handleLike = ()=>{
        if(props.likes.includes(props.currentUserName)){
            like()
        }else{
            if (props.dislikes.includes(props.currentUserName)){
                dislike()
            }
            dispatch(updateCommentById({commentId: props.id, likes: [...props.likes, props.currentUserName]}))
        }
    }

    const deleteComment = () => {
        dispatch(deleteCommentById(props.id))
    }

    const handleDisLike = ()=>{
        if(props.dislikes.includes(props.currentUserName)){
            dislike()
        }else{
            if (props.likes.includes(props.currentUserName)){
                like()
            }
            dispatch(updateCommentById({commentId: props.id, dislikes: [...props.dislikes, props.currentUserName]}))
        }
    }

    const handleEdit =() =>{
        const newText = prompt('Write you comment')
        dispatch(updateCommentById({commentId: props.id, text: newText}))
    }

    return (
        <div>
            <h2>{props.text}</h2>
            <div className={css.footer}>
                <span>{props.username}</span>
            </div>
                <button className={css.like}>like</button>
                <button className={css.dislike}>dislike</button>
                <span>{props.likes.length - props.dislikes.length}</span>
                {isMine && <button onClick={deleteComment}>
                    Delete
                </button>}
                {isMine && <button onClick={handleEdit}>
                    Edit
                </button>}
        </div>
    );
}

export default Comment;