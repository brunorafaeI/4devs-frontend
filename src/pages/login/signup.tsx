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
import { useCallback } from "react"

import { setPageLogin } from "../../storage/state"
import ApiClient from "../../services/http/ApiClient"

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().notRequired()
})

interface TFormRegisterValues {
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
  occupation: string
}

const initialValuesRegister: TFormRegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: ""
}

export default function SignUp() {
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const isNonMobile = useMediaQuery("(min-width:768px)")

  const handleFormSignUp = useCallback(async (values: TFormRegisterValues) => {
    const { user } = await ApiClient.request({
      url: "/auth/register",
      method: "POST",
      data: JSON.stringify(values),
    })

    if (user) {
      dispatch(setPageLogin({}))
    }

  }, []) 

  return (
    <Formik
      onSubmit={handleFormSignUp}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
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
                id="firstName"
                name="firstName"
                label="First name"
                value={values.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Last name"
                value={values.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                id="email"
                name="email"
                label="E-mail"
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
                label="Password"
                type="password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                id="location"
                name="location"
                label="Location"
                value={values.location}
                error={Boolean(touched.location && errors.location)}
                helperText={touched.location && errors.location}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                id="occupation"
                name="occupation"
                label="Occupation"
                value={values.occupation}
                error={Boolean(touched.occupation && errors.occupation)}
                helperText={touched.occupation && errors.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
              />
              <Box gridColumn="span 4" />
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
                "&:hover": { color: palette.primary.main },
              }}
            >
              {"REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                resetForm()
                dispatch(setPageLogin({}))
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
              {"Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}