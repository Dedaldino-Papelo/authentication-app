import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    loading: false,
    success: false,
    userInfo: {},
    RegisterError: "",
    LoginError: ""
}

//Register new User
export const createUsers = createAsyncThunk('type/register',
    async ({ name, email, password }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const config = {
                'content-type': 'application/json'
            }
            const response = await axios.post('http://localhost:5000/register',
                { name, email, password },
                config
            )
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            return fulfillWithValue(response.data)

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const login = createAsyncThunk('type/login',
    async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const config = {
                'content-type': 'application/json'
            }
            const response = await axios.post('http://localhost:5000/login',
                { email, password },
                config
            )
            if (response.data) {
                toast.success("Successfully Login")
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return fulfillWithValue(response.data)

        } catch (error) {
            toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    })


export const userSlice = createSlice({
    name: 'Register',
    initialState,
    reducers: {
        logout(){
            localStorage.removeItem("userInfo")
            return {
                loading: false,
                success: false,
                user: {},
                RegisterError: "",
                LoginError: ""
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUsers.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createUsers.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.RegisterError = ""
            state.userInfo = action.payload
        })

        builder.addCase(createUsers.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.RegisterError = action.payload
        })
        //==================================================================
        //Login reducer  
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.LoginError = ""
            console.log(action.payload)
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.LoginError = action.payload
        })

    }
})

export const { logout } = userSlice.actions

export default userSlice.reducer






