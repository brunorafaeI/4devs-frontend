import { Avatar, Box } from "@mui/material";
import StyledBadge from "../styles/StyledBadge";

interface UserAvatarProps {
  imageUrl: string
  size?: string
}

export function UserAvatar({ imageUrl, size = "56px"}: UserAvatarProps) {
  const baseUrl = import.meta.env.VITE_API_URI
  
  return (
    <Box
      width={size}
      height={size}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar 
          alt="User image" 
          src={`${baseUrl}/images/${imageUrl}`}
          sx={{ width: "100%", height: "100%" }}      
        />
      </StyledBadge>
      
    </Box>)
}

export default UserAvatar