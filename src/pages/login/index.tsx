import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import ServerFeedback from "../../components/snackbar/ServerFeedback"
import { TAuthState } from "../../storage/state"
import SignIn from "./signin"
import SignUp from "./signup"

export default function LoginPage() {
  const theme = useTheme()
  const pageLogin = useSelector((state: TAuthState) => state.pageLogin)
  const isNonMobileScreen = useMediaQuery("(min-width:768px)")

  return (
    <Box>
      <Box 
        width="100%"
        bgcolor={theme.palette.background.paper}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="3.2rem"
          color="primary"
        >
          {"<4>devs"}
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? pageLogin ? "36vw" : "50vw" : "93vw"}
        p="2rem"
        m="2rem auto"
        borderRadius="0.8rem"
        bgcolor={theme.palette.background.paper}
        sx={{ transition: "all .45s ease-in-out" }}
      >
        <Typography 
          fontWeight="500"
          textAlign="center"
          variant="h5"
          sx={{ mb: "3.5rem" }}
        >
        {'Welcome to <4>devs, the social media for everyone!'}
        </Typography>
        {
          pageLogin ? <SignIn /> : <SignUp />
          // <DropzoneForm />
        }
      </Box>
      <ServerFeedback />
    </Box>
  )
}
