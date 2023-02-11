import { createAsyncThunk } from "@reduxjs/toolkit"
import { TFormLoginValues } from "../../pages/login/signin"

export const userLogin = createAsyncThunk(
  'auth/login',
  async (values: TFormLoginValues, { rejectWithValue }) => {
    try {
      const resp = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (resp.status === 200) {
        const {user, token} = await resp.json()

        return {
          user,
          token
        }
      } 
    } catch (err: any) {
      const { message } = err
      rejectWithValue(message)
    }    
  }
)