import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {MAIN_URL} from "../utils/constant";


export const getPostsByPageNumber = createAsyncThunk('posts/getPosts', async (pageNum) => {
    const response = await fetch(MAIN_URL + `post/page/${pageNum}`);
    const data = await response.json();
    return data.result;
})
export const filterPostsByKeyword = createAsyncThunk('posts/filterPostsByKeyword', async (keyword) => {
    const response = await fetch(MAIN_URL + `post/search/${keyword}`)
    const data = await response.json()
    return data.result
})
export const createPost =
    createAsyncThunk('posts/createPost', async ({title, username, file}, {dispatch})=>{
        const response = await fetch(MAIN_URL + `post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                username
            })
        })
        const json = await response.json()
        if(!file) return json.result

        const formData = new FormData()
        formData.append("picture", file)
        const imgResponse = await fetch(MAIN_URL+ `post/${json.result.id}/picture`,{
            method: 'POST',
            body: formData
        })
        const imgJson = await imgResponse.json()
        return imgJson.result
    })

export const updatePost = createAsyncThunk('posts/updatePost',
    async ({title, likes, dislike, postId},{dispatch})=>{
    const response = await fetch(MAIN_URL + `post/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            likes,
            dislike
        })
    })
        const data = await response.json()
        return data.result
    })
export const deletePostById = createAsyncThunk('posts/deletePostById',
    async (postId)=>{
    const response = await fetch(MAIN_URL+`post/${postId}`,
        {
            method: 'DELETE'
        })
    })

export const createCommentByPostId = createAsyncThunk('posts/createCommentByPostId', async ({postId, text, username}) => {
    const response = await fetch(MAIN_URL + `comment/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId,
            text,
            username,
        })
    })
    const data = await response.json()
    return data.result
})
export const updateCommentById = createAsyncThunk('posts/updateCommentById', async ({commentId, text, likes, dislikes}) => {
    const response = await fetch(MAIN_URL + `comment/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text,
            likes,
            dislikes,
        })
    })
    const updatedComment = await response.json()
    return updatedComment.result
})
export const deleteCommentById = createAsyncThunk('posts/deleteCommentById', async (commentId) => {
    const response = await fetch(MAIN_URL + `comment/${commentId}`, {
        method: 'DELETE',
    })
    const deletedComment = await response.json()
    return deletedComment.result
})




const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        pageNum: 1,
        totalPages: 1,
        currentPostInfo: {
            id: 0,
            title: '',
            imageSrc: null
        },
        edit: false,
        loading: 'idle'
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            return state
        },
        setPageNum: (state, action) => {
            state.pageNum = action.payload
            return state
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
            return state
        },
        setCurrentPostInfo: (state, action) =>{
            state.currentPostInfo = action.payload
            return state
        },

        setEdit: (state, action) =>{
            state.edit = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getPostsByPageNumber.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(getPostsByPageNumber.fulfilled, (state, action) => {
            state.posts = action.payload.result
            state.totalPages = action.payload.totalPages
            state.loading = 'idle'
        })
        builder.addCase(getPostsByPageNumber.rejected, (state, action) => {
            state.loading = 'idle'
        })

        builder.addCase(filterPostsByKeyword.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(filterPostsByKeyword.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = 'idle'
        })

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts = [...state.posts, action.payload]
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id)
            const postArr = [...state.posts]
            const comments = (action.payload && action.payload.comment) || [];
            postArr[index] = {...action.payload, comments}
            state.posts = postArr
        })

        builder.addCase(deletePostById.fulfilled, (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id)
            const postArr = [...state.posts]
            postArr.splice(index, 1)
            state.posts = postArr
        })

        builder.addCase(createCommentByPostId.fulfilled, (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.postId)
            const postArr = [...state.posts]
            postArr[index].comments.push(action.payload)
            state.posts = postArr
        })

        builder.addCase(updateCommentById.fulfilled, (state, action) => {
            const postIndex = state.posts.findIndex(post => post.id === action.payload.postId)
            const postArr = [...state.posts]
            const commentIndex = postArr[postIndex].comments.findIndex(comment => comment.id === action.payload.id)
            postArr[postIndex].comments[commentIndex] = action.payload
            state.posts = postArr
        })

        builder.addCase(deleteCommentById.fulfilled, (state, action) => {
            const postIndex = state.posts.findIndex(post => post.id === action.payload.postId)
            const postArr = [...state.posts]
            const commentIndex = postArr.findIndex(comment => comment.id === action.payload.id)
            postArr[postIndex].comments.splice(commentIndex, 1)
            state.posts = postArr
        })
    }
})

export default postSlice.reducer
export const {setCurrentPostInfo, setEdit, setPageNum,setPosts,setTotalPages} = postSlice.actions