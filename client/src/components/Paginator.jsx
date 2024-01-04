import React from 'react';
import css from './main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPostInfo,setPageNum } from "../redux/postSlice";


function Paginator({setNewPostOpened}) {
    const dispatch = useDispatch()
    const pageNum = useSelector(state => state.posts.pageNum)
    const totalPages = useSelector(state => state.posts.totalPages)
    const decrement = () => {
        if (pageNum <= 1) return
        dispatch(setPageNum(pageNum - 1))
        setNewPostOpened(false)
        dispatch(setCurrentPostInfo({title: '', imageScr: null}))
    }
    const increment = () => {
        if (pageNum >= totalPages) return
        dispatch(setPageNum(pageNum + 1))
        setNewPostOpened(false)
        dispatch(setCurrentPostInfo({title: '', imageScr: null}))
    }
    return (
        <div className={css.paginator}>
            <button onClick={decrement}> {'<'} </button>
            <span> {pageNum} </span>
            <button onClick={increment}> {'>'} </button>
        </div>
    );
}

export default Paginator;