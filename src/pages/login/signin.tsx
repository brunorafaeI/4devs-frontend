import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material"
import { Formik } from "formik"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { setLogin, setPageLogin } from "../../storage/state"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import { ApiClient } from "../../services/http/ApiClient"

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

export interface TFormLoginValues {
  email: string
  password: string
}

const initialValuesLogin: TFormLoginValues = {
  email: "",
  password: "",
}

export default function SignIn() {
  const { palette } = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isNonMobile = useMediaQuery("(min-width:768px)")

  const handleFormSignIn = useCallback(async (values: TFormLoginValues) => {
    const { user, token } = await ApiClient.request({
      url: "/auth/login",
      method: "POST",
      data: JSON.stringify(values),
    })

    if (user && token) {
      dispatch(setLogin({user, token}))
      navigate("/home")
    }
  
  }, [dispatch, navigate])

  return (
    <Formik
      onSubmit={handleFormSignIn}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="2rem"
            sx={{
              "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
            }}
          >
            <>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                id="password"
                name="password"
                label="password"
                type="password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
              />
            </>
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              variant="outlined"
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                bgcolor: palette.primary.main,
                color: palette.background.paper,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main
                },
              }}
            >
              {"LOGIN"}
            </Button>
            <Typography
              onClick={() => {
                resetForm()
                dispatch(setPageLogin({ }))
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  opacity: 0.6,
                  cursor: "pointer",
                },
              }}
            >
              {"Create a new account"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}