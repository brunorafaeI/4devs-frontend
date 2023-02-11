import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit"
import { userLogin } from "../actions/auth-login"

type TAuthState = {
  loading: boolean,
  userInfo: string|null,
  userToken: string|null,
  error: any,
  success: boolean,
}

const initialState: TAuthState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
}

export const authSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }: ActionReducerMapBuilder<TAuthState>) => {
    addCase(userLogin.pending, (state) => {
      state.loading = true
    })  

    addCase(userLogin.fulfilled, (state, { payload }) => {
      // TODO :
    })

    addCase(userLogin.rejected, (state, { payload }) => {
      // TODO :
    })
  },
})

export default authSlice.reducer