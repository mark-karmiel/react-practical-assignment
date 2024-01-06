import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {deleteCommentById, deletePostById, setCurrentPostInfo, setEdit, updatePost} from "../../redux/postSlice";
import Comment from "../Comment";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import css from './post.css'
import NewComment from "../NewComment";

dayjs.extend(relativeTime)



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
        const index = props.dislikes.findIndex(author => author === props.currentUserName)
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
            <h3>{props.title}</h3>
            <div>
                <img src={props.imageSrc} alt={''}/>
            </div>
            <div className={css.footer}>
                <span>{props.username}  posted it </span>
                <span className={css.timestamp}>{dayjs(new Date(+props.date)).fromNow()}</span>
            </div>
            <button className={css.like} onClick={handleLike}>like</button>
            <span> {props.likes.length - props.dislikes.length} </span>
            <button className={css.dislike} onClick={handleDisLike}>dislike</button>

            {isMine && <button  onClick={deletePost}>
                Delete
            </button>}
            {isMine && <button  onClick={handleEdit}>
                Edit
            </button>}
            <div className={css.newComment}>
                <button onClick={()=> setComment(!comment)}>
                    Comments
                </button>
                {comment && <button className={css.newCommentButton} onClick={()=>setNewComment(!newComment)}>New comment</button>}
                {comment && props.comments && props.comments.map(comment => (
                    <Comment key={comment.id}
                             {...comment}
                             currentUserName={props.currentUserName}/>

                ))}
            </div>

            {newComment && comment && <NewComment postId={props.id}/>}
        </div>

    );
}

export default Post;