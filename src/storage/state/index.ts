import { createSlice, Slice } from "@reduxjs/toolkit"

export type TPost = {
  _id: string
}

export type TUser = {
  _id: string
  name: string
  posts: TPost[]
  firstName: string
  lastName: string
  friends: string[]
  picturePath: string
}

export type TAuthState = {
  mode: string
  user: TUser
  token: string|null
  posts: TPost[]
  pageLogin: boolean
}

const initialState: TAuthState = {
  mode: "light",
  user: <TUser>{},
  token: null,
  posts: <TPost[]>[],
  pageLogin: false
}

export const authSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = <TUser>{}
      state.token = null
    },
    setFriends: (state, action) => {
      state.user 
        ? state.user.friends = action.payload.friends 
        : console.log("No friends")
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatePosts = state.posts.map((post: TPost) => {
        return post._id === action.payload._id
          ? action.payload.post
          : post
      })
      state.posts = updatePosts
    },
    setPageLogin: (state) => {
      state.pageLogin = !state.pageLogin
    },
  },
})

export const { 
  setMode, 
  setLogin, 
  setLogout, 
  setFriends, 
  setPosts, 
  setPost,
  setPageLogin, 
} = authSlice.actions

export default authSlice.reducer