import { useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControl,
  Badge
} from '@mui/material'

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material'

import { useSelector, useDispatch } from'react-redux'
import FlexBetween from '../styles/FlexBetween'
import { useNavigate } from 'react-router-dom'

import { setMode, setLogout, TAuthState } from '../../storage/state'
import StyledBadgeNotification from '../styles/StyledBadgeNotification'

const NavbarPage = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: TAuthState) => state.user)
  const isNonMobileScreen = useMediaQuery("(min-width:768px)")

  const theme = useTheme()
  const secondaryLight = theme.palette.secondary.light
  const dark = theme.palette.secondary.dark
  const background = theme.palette.background.default
  const paper = theme.palette.background.paper

  const fullName = `${user.firstName || 'Jhon'} ${user.lastName || 'Doe'}`

  return (
    <FlexBetween padding="1rem 6%" bgcolor={paper}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              opacity: 0.6,
              cursor: "pointer",
            },
          }}
        >
          {'<4>devs'}
        </Typography>
        {isNonMobileScreen && (
          <FlexBetween
            bgcolor={secondaryLight}
            borderRadius={2}
            marginLeft={12}
            gap="1rem"
            padding="0.2rem 1.2rem"
            sx={{
              "&:focus": {
                gap: "3rem",
                transition: "all .25s ease-in-out",
              },
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode({ }))}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "24px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "24px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => {}} >
            <Message sx={{ fontSize: "24px" }} />
          </IconButton>
          <IconButton onClick={() => {}}>
              <StyledBadgeNotification
                badgeContent={3}
                color="error"
              >
                <Notifications sx={{ fontSize: "24px" }} />
              </StyledBadgeNotification>            
          </IconButton>
          <IconButton onClick={() => {}}>
            <Help sx={{ fontSize: "24px" }} />
          </IconButton>
          <FormControl variant="standard" aria-valuetext={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: secondaryLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: secondaryLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  dispatch(setLogout({ }))
                  navigate("/")
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          bgcolor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode({}))}
              sx={{ fontSize: "24px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "24px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "24px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "24px" }} />
            <Notifications sx={{ fontSize: "24px" }} />
            <Help sx={{ fontSize: "24px" }} />
            <FormControl variant="standard" aria-valuetext={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: secondaryLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: secondaryLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  dispatch(setLogout({}))
                  navigate("/")
                }}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default NavbarPage