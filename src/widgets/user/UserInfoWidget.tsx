import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/styles/FlexBetween'
import WidgetWrapper from '../../components/styles/WidgetWrapper'
import UserAvatar from '../../components/user/UserAvatar'
import { TAuthState } from '../../storage/state'

export function UserInfoWidget() {
  const userStore = useSelector((state: TAuthState) => state.user)
  const navigate = useNavigate()

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.2rem"
        onClick={() => navigate(`/profile?user=${userStore._id}`)}
      >
        <UserAvatar imageUrl={userStore.picturePath} />
        <Box>
          <Typography
            variant="h6"
            color="#b8b8b8"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: "#797979b9",
                cursor: "pointer",
              }
            }}
          >
            {userStore.firstName} {userStore.lastName}
          </Typography>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default UserInfoWidget