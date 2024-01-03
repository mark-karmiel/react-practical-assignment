import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {MAIN_URL} from "../utils/constant";

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
        loading: 'loading'
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

    }
})

export default postSlice.reducer
export const {setCurrentPostInfo, setEdit} = postSlice.actions