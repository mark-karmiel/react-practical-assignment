import React, {useState} from 'react';
import {createCommentByPostId, setCurrentPostInfo} from "../redux/postSlice";
import css from './Post/post.css'
import {useDispatch, useSelector} from "react-redux";

function NewComment(props) {
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.name)
    const [text, setText] = useState('')
    const currentPostInfo = useSelector(state => state.posts.currentPostInfo)

    const createNewComment = () => {
        if (!text) {
            alert('You need to write the comment')
            return
        }
        dispatch(createCommentByPostId({postId: currentPostInfo.id, text, username}))
        setText('')
    }

    return (
        <div className={css.comment}>
            <input name='text' type="text"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <button onClick={createNewComment}>Submit</button>
        </div>
    );
}

export default NewComment;