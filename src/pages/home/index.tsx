import { Box, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import NavbarPage from "../../components/navbar"
import { TAuthState, TUser } from "../../storage/state"
import UserInfoWidget from "../../widgets/user/UserInfoWidget"

const HomePage = () => {
  const user: TUser = useSelector((state: TAuthState) => state.user)
  
  return (
    <Box>
      <NavbarPage />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <UserInfoWidget />
      </Box>
    </Box>
  )
}

export default HomePage