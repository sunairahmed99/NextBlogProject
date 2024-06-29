import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const registerUser = createAsyncThunk(
    'users/register',
    async (data:any,{rejectWithValue}) => {
        try{

            let response = await axios.post('http://localhost:3000/api/user/register',data)

            if(response.data.status !==200){
               throw new Error(response.data.message)
            }

            localStorage.setItem('token',response.data.token)
            return response.data.data

        }catch(error:any){

            return rejectWithValue(error.message)

        }
    },
  )

export const loginUser = createAsyncThunk(
  'users/login',
  async (data:any,{rejectWithValue}) => {
      try{

          let response = await axios.post('http://localhost:3000/api/user/login',data)
          if (response.data.status !== 200) {
            throw new Error(response.data.message);
          }
          localStorage.setItem('token',response.data.token)
          return response.data.data

      }catch(error:any){
          return rejectWithValue(error.message)

      }
  },
)

export const getUser = createAsyncThunk(
  'users/get',
  async (token:any,{rejectWithValue}) => {
      try{
          let response = await axios.get('http://localhost:3000/api/user/getuser',{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          if (response.data.status !== 200) {
            localStorage.removeItem('token')
            throw new Error(response.data.message);
          }
          return response.data.data

      }catch(error:any){
           localStorage.removeItem('token')
           return rejectWithValue(error.message)
      }
  },
)

export const forgotUser = createAsyncThunk(
  'users/forgot',
  async (data:any,{rejectWithValue}) => {
      try{

          let response = await axios.post('http://localhost:3000/api/user/forgotpassword',data)
          
          console.log(response.data.message)
          return response.data.message

      }catch(error:any){
        console.log(error)
          return rejectWithValue(error)
      }
  },
)

export const resetpass = createAsyncThunk(
  'users/reset',
  async ({id,data}:any,{rejectWithValue}) => {
      try{

          let response = await axios.patch(`http://localhost:3000/api/user/resetpass/${id}`,data)

          if(response.data.status !==200){
            throw new Error(response.data.message)
         }
          
          return response.data

      }catch(error:any){
          return rejectWithValue(error.message)
      }
  },
)

export const updateprofile = createAsyncThunk(
  'users/profile',
  async ({id,formData,token}:any,{rejectWithValue}) => {
      try{

          let response = await axios.patch(`http://localhost:3000/api/user/profile/${id}`,formData,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })

          if(response.data.status !==200){
             throw new Error(response.data.message)
          }
          return response.data.data

      }catch(error:any){

          return rejectWithValue(error.message)

      }
  },
)
export const updatepass = createAsyncThunk(
  'users/updatepass',
  async ({data,token}:any,{rejectWithValue}) => {
      try{

          let response = await axios.patch(`http://localhost:3000/api/user/updatepassword`,data,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })

          if(response.data.status !==200){
            throw new Error(response.data.message)
         }
          
          console.log(response.data)
          return response.data

      }catch(error:any){
          return rejectWithValue(error.message)
      }
  },
)





export interface userState {
  user:[] | null | any,
  loading:Boolean,
  error:Boolean,
  status:string | null,
  errmsg:null | string
}

export interface RootStates {
  users: userState;
  // Add other slice states if any
}

const initialState: userState = {
  user: [],
  status:null,
  loading:false,
  error:false,
  errmsg:null
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
  
    builder
    .addCase(registerUser.pending, (state, action) => {  
        state.loading = true
        state.error = false
    })
    .addCase(registerUser.fulfilled, (state, action) => {  
        state.loading = false
        state.error = false
        state.status = 'fullfilled'
        state.user?.push(action.payload)
    })
    .addCase(registerUser.rejected, (state, action:any) => { 
        state.loading = false
        state.error = true
        state.errmsg = action.payload
    })
    .addCase(loginUser.pending, (state, action) => {  
        state.loading = true
        state.status = 'pending'
        state.error = false
    })
    .addCase(loginUser.fulfilled, (state, action) => {  
        state.loading = false
        state.error = false
        state.status = 'fullfilled'
        state.user = action.payload
    })
    .addCase(loginUser.rejected, (state, action:any) => { 
        state.loading = false
        state.error = true
        state.errmsg = action.payload
    })
    .addCase(getUser.pending, (state, action) => {  
      state.loading = true
      state.error = false
  })
  .addCase(getUser.fulfilled, (state, action) => {  
      state.loading = false
      state.error = false
      state.status = 'fullfilled'
      state.user = action.payload
  })
  .addCase(getUser.rejected, (state, action:any) => { 
      state.loading = false
      state.error = true
      state.errmsg = action.payload
  })
  .addCase(forgotUser.pending, (state, action) => {  
    state.loading = true
    state.error = false
})
  .addCase(forgotUser.fulfilled, (state, action) => {  
      state.loading = false
      state.error = false
      state.status = 'fullfilled'
      state.errmsg = action.payload
  })
  .addCase(resetpass.pending, (state, action) => {  
    state.loading = true
    state.error = false
})
  .addCase(resetpass.fulfilled, (state, action) => {  
      state.loading = false
      state.error = false
      state.status = 'fullfilled'
      state.user = action.payload
  })
  .addCase(resetpass.rejected, (state, action:any) => { 
    state.loading = false
    state.error = true
    state.errmsg = action.payload
})
.addCase(updateprofile.pending, (state, action) => {  
    state.loading = true
    state.error = false
})
  .addCase(updateprofile.fulfilled, (state, action) => {  
      state.loading = false
      state.error = false
      state.status = 'fullfilled'
      state.user = action.payload
  })
  .addCase(updateprofile.rejected, (state, action:any) => { 
    state.loading = false
    state.error = true
    state.errmsg = action.payload
})
.addCase(updatepass.pending, (state, action) => {  
    state.loading = true
    state.error = false
})
  .addCase(updatepass.fulfilled, (state, action) => {  
      state.loading = false
      state.error = false
      state.status = 'fullfilled'
      state.user = action.payload
  })
  .addCase(updatepass.rejected, (state, action:any) => { 
    state.loading = false
    state.error = true
    state.errmsg = action.payload
})

  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const userdata = (state:any) => state.users
export default userSlice.reducer